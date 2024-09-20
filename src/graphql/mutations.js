/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLearningAction = /* GraphQL */ `
  mutation CreateLearningAction($input: CreateLearningActionInput!) {
    createLearningAction(input: $input) {
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
export const updateLearningAction = /* GraphQL */ `
  mutation UpdateLearningAction($input: UpdateLearningActionInput!) {
    updateLearningAction(input: $input) {
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
export const deleteLearningAction = /* GraphQL */ `
  mutation DeleteLearningAction($input: DeleteLearningActionInput!) {
    deleteLearningAction(input: $input) {
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
export const createLearningActionRenderer = /* GraphQL */ `
  mutation CreateLearningActionRenderer(
    $input: CreateLearningActionRendererInput!
  ) {
    createLearningActionRenderer(input: $input) {
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
export const updateLearningActionRenderer = /* GraphQL */ `
  mutation UpdateLearningActionRenderer(
    $input: UpdateLearningActionRendererInput!
  ) {
    updateLearningActionRenderer(input: $input) {
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
export const deleteLearningActionRenderer = /* GraphQL */ `
  mutation DeleteLearningActionRenderer(
    $input: DeleteLearningActionRendererInput!
  ) {
    deleteLearningActionRenderer(input: $input) {
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
export const createWorkflow = /* GraphQL */ `
  mutation CreateWorkflow($input: CreateWorkflowInput!) {
    createWorkflow(input: $input) {
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
export const updateWorkflow = /* GraphQL */ `
  mutation UpdateWorkflow($input: UpdateWorkflowInput!) {
    updateWorkflow(input: $input) {
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
export const deleteWorkflow = /* GraphQL */ `
  mutation DeleteWorkflow($input: DeleteWorkflowInput!) {
    deleteWorkflow(input: $input) {
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
export const createClassWorkflowMetadata = /* GraphQL */ `
  mutation CreateClassWorkflowMetadata(
    $input: CreateClassWorkflowMetadataInput!
  ) {
    createClassWorkflowMetadata(input: $input) {
      id
      classId
      courseId
      data
      workflowId
    }
  }
`;
export const updateClassWorkflowMetadata = /* GraphQL */ `
  mutation UpdateClassWorkflowMetadata(
    $input: UpdateClassWorkflowMetadataInput!
  ) {
    updateClassWorkflowMetadata(input: $input) {
      id
      classId
      courseId
      data
      workflowId
    }
  }
`;
export const deleteClassWorkflowMetadata = /* GraphQL */ `
  mutation DeleteClassWorkflowMetadata(
    $input: DeleteClassWorkflowMetadataInput!
  ) {
    deleteClassWorkflowMetadata(input: $input) {
      id
      classId
      courseId
      data
      workflowId
    }
  }
`;
export const createTags = /* GraphQL */ `
  mutation CreateTags($input: CreateTagsInput!) {
    createTags(input: $input) {
      id
      key
      value
    }
  }
`;
export const updateTags = /* GraphQL */ `
  mutation UpdateTags($input: UpdateTagsInput!) {
    updateTags(input: $input) {
      id
      key
      value
    }
  }
`;
export const deleteTags = /* GraphQL */ `
  mutation DeleteTags($input: DeleteTagsInput!) {
    deleteTags(input: $input) {
      id
      key
      value
    }
  }
`;
