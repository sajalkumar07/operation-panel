/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLearningAction = /* GraphQL */ `
  query GetLearningAction($id: ID!) {
    getLearningAction(id: $id) {
      id
      version
      name
      descriptionImage
      descriptiontext
      actionType
      actionData
      tags
      updatedAt
      createdAt
      createdBy
      updatedBy
      lessonPlanTemplate
      lessonPlanDocumentUrl
      userRole
      uniqueIdentifier
      publishStatus
    }
  }
`;
export const listLearningActions = /* GraphQL */ `
  query ListLearningActions(
    $filter: TableLearningActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLearningActions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        version
        name
        descriptionImage
        descriptiontext
        actionType
        actionData
        tags
        updatedAt
        createdAt
        createdBy
        updatedBy
        lessonPlanTemplate
        lessonPlanDocumentUrl
        userRole
        uniqueIdentifier
        publishStatus
      }
      nextToken
    }
  }
`;
export const getLearningActionRenderer = /* GraphQL */ `
  query GetLearningActionRenderer($id: ID!) {
    getLearningActionRenderer(id: $id) {
      id
      actionType
      editRenderPath
      viewRenderPath
      updatedAt
      createdAt
      createdBy
      UpdatedBy
    }
  }
`;
export const listLearningActionRenderers = /* GraphQL */ `
  query ListLearningActionRenderers(
    $filter: TableLearningActionRendererFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLearningActionRenderers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        actionType
        editRenderPath
        viewRenderPath
        updatedAt
        createdAt
        createdBy
        UpdatedBy
      }
      nextToken
    }
  }
`;
export const getWorkflow = /* GraphQL */ `
  query GetWorkflow($id: ID!) {
    getWorkflow(id: $id) {
      id
      name
      descriptionImage
      descriptionText
      data
      updatedAt
      createdAt
      createdBy
      updatedBy
    }
  }
`;
export const listWorkflows = /* GraphQL */ `
  query ListWorkflows(
    $filter: TableWorkflowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkflows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        descriptionImage
        descriptionText
        data
        updatedAt
        createdAt
        createdBy
        updatedBy
      }
      nextToken
    }
  }
`;
export const getClassWorkflowMetadata = /* GraphQL */ `
  query GetClassWorkflowMetadata($id: ID!) {
    getClassWorkflowMetadata(id: $id) {
      id
      classId
      courseId
      data
      workflowId
    }
  }
`;
export const listClassWorkflowMetadata = /* GraphQL */ `
  query ListClassWorkflowMetadata(
    $filter: TableClassWorkflowMetadataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClassWorkflowMetadata(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classId
        courseId
        data
        workflowId
      }
      nextToken
    }
  }
`;
export const getTags = /* GraphQL */ `
  query GetTags($key: String!, $value: String!) {
    getTags(key: $key, value: $value) {
      id
      key
      value
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: TableTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        key
        value
      }
      nextToken
    }
  }
`;
