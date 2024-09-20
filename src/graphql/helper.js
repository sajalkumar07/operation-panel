import { getLoggedInUser } from "./../components/NativeActivity/InClassVideoWrapper/helpers/utils";
import { API, graphqlOperation } from "aws-amplify";
import { listTags, getTags } from "./queries";
import { createTags } from "./mutations";
import {
  api_getTags,
  api_createTags,
  api_listTags
} from "../services/smartclass.services";

let tagHash = {};
let glCache = {};

export const getGlCache = key => {
  return glCache[key];
};

export const setGlCache = (key, value) => {
  glCache[key] = value;
};

export const getGraphqlExtraKeys = (type = "create") => {
  let currentUser = getLoggedInUser();
  if (type === "create") {
    return {
      createdAt: new Date().getTime().toString(),
      createdBy: JSON.stringify(currentUser),
      updatedAt: new Date().getTime().toString()
    };
  } else {
    return {
      updatedAt: new Date().getTime().toString()
    };
  }
};

export const gatherAllQueryData = async (op, vars, opName) => {
  const _data = { [`${opName}`]: { items: [] } };
  let nextToken = null;
  do {
    const data = await API.graphql(
      graphqlOperation(op, nextToken ? { ...vars, nextToken: nextToken } : vars)
    );
    _data[`${opName}`].items = [
      ..._data[opName].items,
      ...data.data[opName].items
    ];
    nextToken = data.data[opName].nextToken;
  } while (nextToken);
  return { data: _data };
};

export const getAllTags = async () => {
  const data = await api_listTags();
  return data.data.listTags.items;
};

export const createOrUpdateTag = async (key, value) => {
  if (tagHash[`${key}:${value}`]) {
    return true;
  }
  let response = await api_getTags({
    key,
    value
  });
  //console.log(`completed for`, key, value, response);
  if (!response.data.getTags) {
    response = await api_createTags({
      input: {
        id: `${key}:${value}`,
        key: key,
        value: value
      }
    });

    tagHash[`${key}:${value}`] = true;
  } else {
    tagHash[`${key}:${value}`] = true;
  }
};
