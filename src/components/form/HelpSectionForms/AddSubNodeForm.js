import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Formik, Field } from "formik";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import SubmitButton from "../../buttons/SubmitButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SUBNODE_VALIDATION_SCHEMA } from "../../../helpers/validation";
import { styles } from "./AddSubNodeFormStyles";
import { WARNING_ICON } from "../../../helpers/ImagePath";

const newSubNode = () => ({
  name: "",
  isTerminal: "false",
  user: "",
  level: null,
  region: "",
  writeToUs: "false",
  relatedFaq: "",
  parentNodeId: null,
  channels: {
    chat: null,
    email: null,
    isCall: null
  },
  faqId: "",
  subject: "",
  imgSrc: "",
  isActive: false
});

const AddSubNodeForm = ({
  values,
  previouslyIsNoneTerminal,
  classes,
  onSubmit,
  reloadFAQs,
  isPrimaryNode,
  isEdit,
  userTypes = [],
  regions = [],
  subjects = [],
  relatedFaqIds = [],
  relatedEmailIds = []
}) => {
  const InputLabelProps = {
    shrink: true
  };

  const parentInfo = JSON.parse(localStorage.getItem("CurrentPrimaryNodeInfo"));

  const getFAQDataWithDisplayName = () => {
    if (relatedFaqIds && relatedFaqIds.length > 0) {
      return relatedFaqIds
        ? relatedFaqIds.map(item => {
            item.displayName = item.id.toString() + " - " + item.question;
            return item;
          })
        : relatedFaqIds;
    } else {
      return relatedFaqIds;
    }
  };

  const makeSubject = savedSubject => {
    if (!savedSubject) return [];
    return savedSubject.split(",").map(val => ({ name: val }));
  };

  const onSubjectChange = (newVal, setFieldValue) => {
    let selectedSubj = newVal.map(val => val.name);
    let uniqueSelectedSubj = [...new Set(selectedSubj)].join(",");
    setFieldValue("courseTypes", uniqueSelectedSubj);
  };

  const onChangeIsTerminal = (
    isTerminalValue,
    writeToUsValue,
    setFieldValue
  ) => {
    setFieldValue("isTerminal", isTerminalValue);
    autoCheckEmailCheckbox(isTerminalValue, writeToUsValue, setFieldValue);
  };

  const onChangeIsWriteToUs = (
    writeToUsValue,
    isTerminalValue,
    setFieldValue
  ) => {
    setFieldValue("writeToUs", writeToUsValue);
    autoCheckEmailCheckbox(isTerminalValue, writeToUsValue, setFieldValue);
  };

  const autoCheckEmailCheckbox = (
    isTerminalValue,
    writeToUsValue,
    setFieldValue
  ) => {
    const isEmailChecked =
      isTerminalValue === "true" && writeToUsValue === "true" ? true : false;
    setFieldValue("email", isEmailChecked);
  };

  const makeLinkedFAQId = savedFAQId => {
    if (!savedFAQId) return [];
    let filteredFAQIds = savedFAQId.split(",").map(val => {
      let selectedItem = relatedFaqIds.filter(
        itm => itm.id.toString() === val
      )[0];
      return {
        id: selectedItem ? selectedItem.id : "-1",
        displayName: selectedItem ? selectedItem.displayName : ""
      };
    });
    return filteredFAQIds;
  };

  const onLinkedFAQIdChange = (newVal, setFieldValue) => {
    let selectedFAQIds = newVal.map(val => val.id.toString());
    let uniqueSelectedFAQIds = [...new Set(selectedFAQIds)].join(",");
    setFieldValue("relatedFaqs", uniqueSelectedFAQIds);
  };

  const makeLinkedZenDeskEmailIds = savedEmailId => {
    if (!savedEmailId) return [];
    return savedEmailId.split(",").map(val => ({ email: val }));
  };

  const onLinkedEmailIdChange = (newVal, setFieldValue) => {
    let selectedEmailIds = newVal.map(val => val.email);
    let uniqueSelectedEmailIds = [...new Set(selectedEmailIds)].join(",");
    setFieldValue("relatedEmailIds", uniqueSelectedEmailIds);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...newSubNode(),
          ...values
        }}
        validationSchema={SUBNODE_VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleReset,
          isSubmitting,
          setFieldValue,
          errors,
          touched
        }) => {
          return (
            <form onSubmit={handleSubmit} onReset={handleReset}>
              {values.isTerminal === "true" &&
              isEdit &&
              previouslyIsNoneTerminal ? (
                <div className={`${classes.warningDiv}`}>
                  <div>
                    <img
                      src={WARNING_ICON}
                      className={`${classes.warningIcon}`}
                    />
                  </div>
                  <span className={`${classes.warningSpan}`}>
                    Changing Non Terminal node to Terminal node will lead to
                    deletion of of all levels in that node.
                  </span>
                </div>
              ) : null}

              <div className={`${classes.containerDiv}`}>
                <div className={`${classes.radioBtnTitleDiv}`}>
                  Is terminal node?
                </div>
                <div role="group">
                  <label className={`${classes.radioBtnOption}`}>
                    <Field
                      className={`${classes.radioBtnStyle}`}
                      type="radio"
                      name="isTerminal"
                      value="true"
                      checked={values.isTerminal === "true"}
                      onChange={e =>
                        onChangeIsTerminal(
                          "true",
                          values.writeToUs,
                          setFieldValue
                        )
                      }
                    />
                    Yes
                  </label>
                  <label className={`${classes.radioBtnOption}`}>
                    <Field
                      className={`${classes.radioBtnStyle}`}
                      type="radio"
                      name="isTerminal"
                      value="false"
                      checked={values.isTerminal === "false"}
                      onChange={e =>
                        onChangeIsTerminal(
                          "false",
                          values.writeToUs,
                          setFieldValue
                        )
                      }
                    />
                    No
                  </label>
                </div>
              </div>

              {values.isTerminal === "false" ? (
                <TextField
                  name="name"
                  error={errors.name && touched.name}
                  label={`Node Name * ${
                    errors.name && touched.name ? `( ${errors.name} )` : ""
                  }`}
                  placeholder="Node Name"
                  variant={"outlined"}
                  fullWidth
                  InputLabelProps={InputLabelProps}
                  className={classes.textField}
                  onChange={handleChange}
                  value={values.name || ""}
                  margin="normal"
                />
              ) : null}

              {values.isTerminal === "true" ? (
                <TextField
                  name="faqId"
                  select
                  error={errors.faqId && touched.faqId}
                  label={`FAQ Id * ${
                    errors.faqId && touched.faqId ? `( ${errors.faqId} )` : ""
                  }`}
                  fullWidth
                  InputLabelProps={InputLabelProps}
                  className={`${classes.textField} w-100`}
                  onChange={handleChange}
                  variant={"outlined"}
                  value={values.faqId}
                  margin="normal"
                >
                  {getFAQDataWithDisplayName().map(({ id, displayName }) => (
                    <MenuItem
                      className={`${classes.listItem}`}
                      key={id}
                      value={id}
                    >
                      {displayName}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              <TextField
                name="user"
                select
                error={errors.user && touched.user}
                label={`User Type * ${
                  errors.user && touched.user ? `( ${errors.user} )` : ""
                }`}
                fullWidth
                InputLabelProps={InputLabelProps}
                className={`${classes.textField} w-100`}
                onChange={e => {
                  setFieldValue("user", e.target.value);
                  reloadFAQs({
                    region: values.region,
                    user: e.target.value,
                    courseTypes: values.courseTypes
                  });
                }}
                variant={"outlined"}
                value={values.user}
                margin="normal"
                disabled={!isPrimaryNode && parentInfo.user !== "BOTH"}
              >
                {userTypes.map(({ id, name }) => (
                  <MenuItem key={id} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>

              <Autocomplete
                multiple
                id="tags-outlined"
                className={`${classes.textField} w-100`}
                options={subjects}
                value={makeSubject(values.courseTypes)}
                onChange={(e, newValue) => {
                  onSubjectChange(newValue, setFieldValue);
                  reloadFAQs({
                    region: values.region,
                    user: values.user,
                    courseTypes: [
                      ...new Set(newValue.map(val => val.name))
                    ].join(",")
                  });
                }}
                getOptionLabel={option => option.name}
                filterSelectedOptions
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    error={errors.courseTypes && touched.courseTypes}
                    label={`Course Types * ${
                      errors.courseTypes ? `( ${errors.courseTypes} )` : ""
                    }`}
                    placeholder="Course Types *"
                  />
                )}
              />

              {values.isTerminal === "true" ? (
                <>
                  <div className={`${classes.commsHeaderDiv}`}>
                    Comms Channels
                  </div>
                  <div className={`d-flex flex-row col-12`}>
                    <div className={"col-4"}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="chat"
                            checked={values.chat || false}
                            onChange={e => {
                              setFieldValue("chat", e.target.checked);
                            }}
                          />
                        }
                        label="Chat"
                      />
                    </div>

                    <div className={"col-4"}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="email"
                            checked={values.email || false}
                            onChange={e => {
                              setFieldValue("email", e.target.checked);
                            }}
                          />
                        }
                        label="Email"
                      />
                    </div>

                    <div className={"col-4"}>
                      <FormControlLabel
                        className={"col-4"}
                        control={
                          <Checkbox
                            name="isCall"
                            checked={values.isCall || false}
                            onChange={e => {
                              setFieldValue("isCall", e.target.checked);
                            }}
                          />
                        }
                        label="Call"
                      />
                    </div>
                  </div>

                  <div className={`d-flex flex-row col-12`}>
                    <div className={"col-4"}>
                      {values.chat ? (
                        <TextField
                          name="zendeskChat"
                          error={errors.zendeskChat && touched.chat}
                          label={`Zendesk Chat Tag * ${
                            errors.zendeskChat && touched.chat
                              ? `( ${errors.zendeskChat} )`
                              : ""
                          }`}
                          placeholder="Zendesk Chat *"
                          variant={"outlined"}
                          fullWidth
                          InputLabelProps={InputLabelProps}
                          className={classes.textField}
                          onChange={handleChange}
                          value={values.zendeskChat || ""}
                          margin="normal"
                        />
                      ) : null}
                    </div>

                    <div className={`${classes.emailFieldDiv} col-8`}>
                      {values.email ? (
                        <Autocomplete
                          multiple
                          id="tags-outlined-zenkDesk"
                          className={`${classes.textField}`}
                          options={relatedEmailIds}
                          value={makeLinkedZenDeskEmailIds(
                            values.relatedEmailIds
                          )}
                          onChange={(e, newValue) =>
                            onLinkedEmailIdChange(newValue, setFieldValue)
                          }
                          getOptionLabel={option => option.email}
                          filterSelectedOptions
                          renderInput={params => (
                            <TextField
                              {...params}
                              variant="outlined"
                              error={errors.relatedEmailIds && touched.email}
                              label={`Zendesk Email Ids * ${
                                errors.relatedEmailIds && touched.email
                                  ? `( ${errors.relatedEmailIds} )`
                                  : ""
                              }`}
                              placeholder="ZenDesk Email Ids *"
                            />
                          )}
                        />
                      ) : null}
                    </div>
                  </div>
                </>
              ) : null}

              <div
                className={`${classes.divLeftPadding} d-flex flex-row col-12`}
              >
                {isPrimaryNode ? (
                  <>
                    <TextField
                      name="region"
                      select
                      error={errors.region && touched.region}
                      label={`Region * ${
                        errors.region && touched.region
                          ? `( ${errors.region} )`
                          : ""
                      }`}
                      fullWidth
                      InputLabelProps={InputLabelProps}
                      className={`col-5 ${classes.textField}`}
                      onChange={e => {
                        setFieldValue("region", e.target.value);
                        reloadFAQs({
                          region: e.target.value,
                          user: values.user,
                          courseTypes: values.courseTypes
                        });
                      }}
                      variant={"outlined"}
                      value={values.region || ""}
                      margin="normal"
                    >
                      {regions.map(({ id, name }) => (
                        <MenuItem key={id} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      name="imgSrc"
                      error={errors.imgSrc && touched.imgSrc}
                      label={`Icon URL ${
                        errors.imgSrc && touched.imgSrc
                          ? `( ${errors.imgSrc} )`
                          : ""
                      }`}
                      placeholder="Icon URL"
                      variant={"outlined"}
                      fullWidth
                      InputLabelProps={InputLabelProps}
                      className={`col-7 ${classes.textField}`}
                      onChange={handleChange}
                      value={values.imgSrc || ""}
                      margin="normal"
                    />
                  </>
                ) : null}
              </div>

              <div className={`${classes.containerDiv}`}>
                <div className={`${classes.radioBtnTitleDiv}`}>
                  Is write to us node?
                </div>
                <div role="group">
                  <label className={`${classes.radioBtnOption}`}>
                    <Field
                      className={`${classes.radioBtnStyle}`}
                      type="radio"
                      name="writeToUs"
                      value="true"
                      checked={values.writeToUs === "true"}
                      onChange={e =>
                        onChangeIsWriteToUs(
                          "true",
                          values.isTerminal,
                          setFieldValue
                        )
                      }
                    />
                    Yes
                  </label>
                  <label className={`${classes.radioBtnOption}`}>
                    <Field
                      className={`${classes.radioBtnStyle}`}
                      type="radio"
                      name="writeToUs"
                      value="false"
                      checked={values.writeToUs === "false"}
                      onChange={e =>
                        onChangeIsWriteToUs(
                          "false",
                          values.isTerminal,
                          setFieldValue
                        )
                      }
                    />
                    No
                  </label>
                </div>
              </div>
              <Autocomplete
                multiple
                id="tags-outlined"
                className={`${classes.textField} w-100`}
                options={getFAQDataWithDisplayName()}
                value={makeLinkedFAQId(values.relatedFaqs)}
                onChange={(e, newValue) =>
                  onLinkedFAQIdChange(newValue, setFieldValue)
                }
                getOptionLabel={option => option.displayName.toString()}
                disabled={isEdit}
                filterSelectedOptions
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Linked FAQ Ids"
                    placeholder="Linked FAQ Ids"
                  />
                )}
              />

              <div className={`mt-4 mb-2 ${classes.buttonsContainerDiv}`}>
                <button
                  className={`${classes.cancelBtn}`}
                  onClick={handleReset}
                >
                  Reset
                </button>
                <SubmitButton
                  className={`${classes.submitBtn}`}
                  isSubmitting={isSubmitting}
                  caption="Save"
                ></SubmitButton>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default withStyles(styles)(AddSubNodeForm);
