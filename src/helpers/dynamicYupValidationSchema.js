import * as yup from "yup";
import { isEmpty, set } from "lodash";

/** Adding just additional methods here */

yup.addMethod(yup.string, "URL", function(...args) {
  return this.url(...args);
});

const validator = function(message) {
  return this.test("is-string-boolean", message, function(value) {
    if (isEmpty(value)) {
      return true;
    }

    if (["Y", "N"].indexOf(value) !== -1) {
      return true;
    } else {
      return false;
    }
  });
};

yup.addMethod(yup.string, "stringBoolean", validator);
yup.addMethod(yup.string, "StringBoolean", validator);

function createYupSchema(schema, config) {
  const { field, validationType, validations = [] } = config;
  const hasPermission = requiredPermission => {
    return (
      !requiredPermission ||
      (this.me && this.me.permission.includes(requiredPermission))
    );
  };

  if (!yup[validationType] && !config.children) {
    return schema;
  }
  if (!hasPermission(config.permission)) return schema;

  if (!config.children) {
    let validator = yup[validationType]();
    validations.forEach(validation => {
      const { params, type } = validation;
      if (!validator[type]) {
        return;
      }
      validator = validator[type](...params);
      if (field.indexOf(".") !== -1) {
        const path = field.split(".");
        schema[path[path.length - 1]] = validator;
      } else {
        schema[field] = validator;
      }
    });
  } else {
    const p_schema = yup
      .object()
      .shape(config.children.reduce(createYupSchema.bind({ me: this.me }), {}));
    if (field.indexOf(".") !== -1) {
      const path = field.split(".");
      set(schema, path[path.length - 1], p_schema);
    } else {
      set(schema, field, p_schema);
    }
  }

  return schema;
}

export const getYupSchemaFromMetaData = (
  metadata,
  additionalValidations,
  forceRemove,
  me
) => {
  if (!metadata) return {};
  const yepSchema = metadata.reduce(createYupSchema.bind({ me }), {});
  const mergedSchema = {
    ...yepSchema,
    ...additionalValidations
  };
  forceRemove.forEach(field => {
    delete mergedSchema[field];
  });

  const validateSchema = yup.object().shape(mergedSchema);

  return validateSchema;
};
