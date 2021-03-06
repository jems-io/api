import { ApiRuntimeContext } from "../../../domain/models";
import { MockResourceActionPipelineService } from "../services";

export const MockApiRuntimeContextWithoutResources: ApiRuntimeContext = {
  api: {
    name: "",
    version: "",
    resources: [],
  },
  apiResourceActionPipelineService: new MockResourceActionPipelineService(),
};

export const MockApiRuntimeContextWithoutActions: ApiRuntimeContext = {
  api: {
    name: "",
    version: "",
    resources: [
      {
        name: "",
        alias: "",
        actions: [],
        resources: [],
      },
    ],
  },
  apiResourceActionPipelineService: new MockResourceActionPipelineService(),
};

export const MockApiRuntimeContext: ApiRuntimeContext = {
  api: {
    name: "",
    version: "",
    resources: [
      {
        name: "Projects",
        alias: "projects",
        actions: [
          {
            id: "projects/query",
            alias: "query",
            name: "",
            type: "query",
          },
        ],
        resources: [],
      },
    ],
  },
  apiResourceActionPipelineService: new MockResourceActionPipelineService(),
};
