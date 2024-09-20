/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLearningAction = /* GraphQL */ `
  subscription OnCreateLearningAction(
    $id: ID
    $version: String
    $name: String
    $descriptionImage: String
    $descriptiontext: String
  ) {
    onCreateLearningAction(
      id: $id
      version: $version
      name: $name
      descriptionImage: $descriptionImage
      descriptiontext: $descriptiontext
    ) {
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
export const onUpdateLearningAction = /* GraphQL */ `
  subscription OnUpdateLearningAction(
    $id: ID
    $version: String
    $name: String
    $descriptionImage: String
    $descriptiontext: String
  ) {
    onUpdateLearningAction(
      id: $id
      version: $version
      name: $name
      descriptionImage: $descriptionImage
      descriptiontext: $descriptiontext
    ) {
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
export const onDeleteLearningAction = /* GraphQL */ `
  subscription OnDeleteLearningAction(
    $id: ID
    $version: String
    $name: String
    $descriptionImage: String
    $descriptiontext: String
  ) {
    onDeleteLearningAction(
      id: $id
      version: $version
      name: $name
      descriptionImage: $descriptionImage
      descriptiontext: $descriptiontext
    ) {
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
export const onCreateLearningActionRenderer = /* GraphQL */ `
  subscription OnCreateLearningActionRenderer(
    $id: ID
    $actionType: String
    $editRenderPath: String
    $viewRenderPath: String
    $updatedAt: String
  ) {
    onCreateLearningActionRenderer(
      id: $id
      actionType: $actionType
      editRenderPath: $editRenderPath
      viewRenderPath: $viewRenderPath
      updatedAt: $updatedAt
    ) {
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
export const onUpdateLearningActionRenderer = /* GraphQL */ `
  subscription OnUpdateLearningActionRenderer(
    $id: ID
    $actionType: String
    $editRenderPath: String
    $viewRenderPath: String
    $updatedAt: String
  ) {
    onUpdateLearningActionRenderer(
      id: $id
      actionType: $actionType
      editRenderPath: $editRenderPath
      viewRenderPath: $viewRenderPath
      updatedAt: $updatedAt
    ) {
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
export const onDeleteLearningActionRenderer = /* GraphQL */ `
  subscription OnDeleteLearningActionRenderer(
    $id: ID
    $actionType: String
    $editRenderPath: String
    $viewRenderPath: String
    $updatedAt: String
  ) {
    onDeleteLearningActionRenderer(
      id: $id
      actionType: $actionType
      editRenderPath: $editRenderPath
      viewRenderPath: $viewRenderPath
      updatedAt: $updatedAt
    ) {
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
export const onCreateWorkflow = /* GraphQL */ `
  subscription OnCreateWorkflow(
    $id: ID
    $name: String
    $descriptionImage: String
    $descriptionText: String
    $data: String
  ) {
    onCreateWorkflow(
      id: $id
      name: $name
      descriptionImage: $descriptionImage
      descriptionText: $descriptionText
      data: $data
    ) {
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
export const onUpdateWorkflow = /* GraphQL */ `
  subscription OnUpdateWorkflow(
    $id: ID
    $name: String
    $descriptionImage: String
    $descriptionText: String
    $data: String
  ) {
    onUpdateWorkflow(
      id: $id
      name: $name
      descriptionImage: $descriptionImage
      descriptionText: $descriptionText
      data: $data
    ) {
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
export const onDeleteWorkflow = /* GraphQL */ `
  subscription OnDeleteWorkflow(
    $id: ID
    $name: String
    $descriptionImage: String
    $descriptionText: String
    $data: String
  ) {
    onDeleteWorkflow(
      id: $id
      name: $name
      descriptionImage: $descriptionImage
      descriptionText: $descriptionText
      data: $data
    ) {
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
export const onCreateClassWorkflowMetadata = /* GraphQL */ `
  subscription OnCreateClassWorkflowMetadata(
    $id: ID
    $classId: String
    $courseId: String
    $data: String
    $workflowId: String
  ) {
    onCreateClassWorkflowMetadata(
      id: $id
      classId: $classId
      courseId: $courseId
      data: $data
      workflowId: $workflowId
    ) {
      id
      classId
      courseId
      data
      workflowId
    }
  }
`;
export const onUpdateClassWorkflowMetadata = /* GraphQL */ `
  subscription OnUpdateClassWorkflowMetadata(
    $id: ID
    $classId: String
    $courseId: String
    $data: String
    $workflowId: String
  ) {
    onUpdateClassWorkflowMetadata(
      id: $id
      classId: $classId
      courseId: $courseId
      data: $data
      workflowId: $workflowId
    ) {
      id
      classId
      courseId
      data
      workflowId
    }
  }
`;
export const onDeleteClassWorkflowMetadata = /* GraphQL */ `
  subscription OnDeleteClassWorkflowMetadata(
    $id: ID
    $classId: String
    $courseId: String
    $data: String
    $workflowId: String
  ) {
    onDeleteClassWorkflowMetadata(
      id: $id
      classId: $classId
      courseId: $courseId
      data: $data
      workflowId: $workflowId
    ) {
      id
      classId
      courseId
      data
      workflowId
    }
  }
`;
export const onCreateTags = /* GraphQL */ `
  subscription OnCreateTags($id: String, $key: String, $value: String) {
    onCreateTags(id: $id, key: $key, value: $value) {
      id
      key
      value
    }
  }
`;
export const onUpdateTags = /* GraphQL */ `
  subscription OnUpdateTags($id: String, $key: String, $value: String) {
    onUpdateTags(id: $id, key: $key, value: $value) {
      id
      key
      value
    }
  }
`;
export const onDeleteTags = /* GraphQL */ `
  subscription OnDeleteTags($id: String, $key: String, $value: String) {
    onDeleteTags(id: $id, key: $key, value: $value) {
      id
      key
      value
    }
  }
`;
