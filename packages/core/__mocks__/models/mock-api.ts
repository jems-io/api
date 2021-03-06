import {
  Api,
  ApiRequest,
  ApiResponse,
  ApiResponseStatus,
} from "../../../domain/models";

export const MockApi: Api = {
  name: "Mock Api",
  version: "0.0.1",
  description: undefined,
  resources: [
    {
      alias: "projects",
      name: "Projects",
      actions: [],
      middlewares: [],
      resources: [
        {
          alias: "vaults",
          name: "Vaults",
          actions: [
            {
              alias: "query",
              name: "Query Vaults",
              type: "query",
              middlewares: [],
              routine: (request): ApiResponse => {
                return {
                  status: "completed",
                  payload: Buffer.from(""),
                  payloadType: "json",
                };
              },
            },
            {
              alias: "get",
              name: "Get Vault By Id",
              type: "get",
              middlewares: [],
              routine: (request): ApiResponse => {
                return {
                  status: "completed",
                  payload: Buffer.from(""),
                  payloadType: "json",
                };
              },
            },
          ],
          middlewares: [],
          resources: [
            {
              alias: "items",
              name: "Items",
              actions: [],
              middlewares: [],
            },
          ],
        },
      ],
    },
  ],
  middlewares: [],
};

export type OnRunAction = (actionAlias: string) => void;
export const getApiMockRunOneAction = (onRunAction: OnRunAction): Api => {
  return {
    name: "Mock Api",
    version: "0.0.1",
    description: undefined,
    resources: [
      {
        alias: "projects",
        name: "Projects",
        actions: [],
        middlewares: [],
        resources: [
          {
            alias: "vaults",
            name: "Vaults",
            actions: [
              {
                alias: "query",
                name: "Query Vaults",
                type: "query",
                middlewares: [],
                routine: (request): ApiResponse => {
                  onRunAction("query");
                  return {
                    status: "completed",
                    payload: Buffer.from(""),
                    payloadType: "json",
                  };
                },
              },
            ],
            middlewares: [],
            resources: [
              {
                alias: "items",
                name: "Items",
                actions: [],
                middlewares: [],
              },
            ],
          },
        ],
      },
    ],
    middlewares: [],
  };
};

export const MockApiCrashOnFirstMiddleware: Api = {
  name: "Mock Api",
  version: "0.0.1",
  description: undefined,
  resources: [
    {
      alias: "projects",
      name: "Projects",
      actions: [
        {
          alias: "query",
          name: "Query Vaults",
          type: "query",
          middlewares: [],
          routine: (request): ApiResponse => {
            return {
              status: "completed",
              payload: Buffer.from(""),
              payloadType: "json",
            };
          },
        },
      ],
      middlewares: [],
      resources: [],
    },
  ],
  middlewares: [
    {
      alias: "middle-crash",
      name: "Crash on Middleware",
      routine: (ApiRequest) => {
        throw Error("Crash on Middleware");
      },
    },
  ],
};

export const MockApiCrashOnDeepMiddleware: Api = {
  name: "Mock Api",
  version: "0.0.1",
  description: undefined,
  resources: [
    {
      alias: "projects",
      name: "Projects",
      actions: [
        {
          alias: "query",
          name: "Query Vaults",
          type: "query",
          middlewares: [
            {
              alias: "middle-deep-crash",
              name: "Crash on Deep Middleware",
              routine: (apiRequest) => {
                throw Error("Crash on Middleware deep");
              },
            },
          ],
          routine: (request): ApiResponse => {
            return {
              status: "completed",
              payload: Buffer.from(""),
              payloadType: "json",
            };
          },
        },
      ],
      middlewares: [],
      resources: [],
    },
  ],
  middlewares: [
    {
      alias: "middle",
      name: "Middleware",
      routine: async (apiRequest, invokeNextRoutine): Promise<ApiResponse> => {
        return invokeNextRoutine(apiRequest);
      },
    },
  ],
};
export const getApiMockRunOneActionWithMultipleResources = (
  onRunAction: OnRunAction
): Api => {
  return {
    name: "Mock Api",
    version: "0.0.1",
    description: undefined,
    resources: [
      {
        alias: "projects2",
        name: "Projects2",
        actions: [],
        middlewares: [],

        resources: [
          {
            alias: "vaults2",
            name: "Vaults2",
            actions: [
              {
                alias: "query2",
                name: "Query Vaults",
                type: "query",
                middlewares: [],
                routine: (request): ApiResponse => {
                  onRunAction("query2");
                  return {
                    status: "completed",
                    payload: Buffer.from(""),
                    payloadType: "json",
                  };
                },
              },
              {
                alias: "get_by_id",
                name: "Get Vault By Id",
                type: "get",
                middlewares: [],
                routine: (request): ApiResponse => {
                  onRunAction("get_by_id");
                  return {
                    status: "completed",
                    payload: Buffer.from(""),
                    payloadType: "json",
                  };
                },
              },
            ],
            middlewares: [],

            resources: [
              {
                alias: "items",
                name: "Items",
                actions: [],
                middlewares: [],
              },
            ],
          },
        ],
      },
      {
        alias: "projects",
        name: "Projects",
        actions: [],
        middlewares: [],

        resources: [
          {
            alias: "vaults",
            name: "Vaults",
            actions: [
              {
                alias: "query",
                name: "Query Vaults",
                type: "query",
                middlewares: [],
                routine: (request): ApiResponse => {
                  onRunAction("projects/vaults/query");
                  return {
                    status: "completed",
                    payload: Buffer.from(""),
                    payloadType: "json",
                  };
                },
              },
            ],
            middlewares: [],

            resources: [
              {
                alias: "items",
                name: "Items",
                actions: [],
                middlewares: [],
              },
            ],
          },
          {
            alias: "encryption",
            name: "encryption",
            actions: [
              {
                alias: "delete",
                name: "Query encryption",
                type: "delete",
                middlewares: [],
                routine: (request): ApiResponse => {
                  onRunAction("delete");
                  return {
                    status: "completed",
                    payload: Buffer.from(""),
                    payloadType: "json",
                  };
                },
              },
            ],
            middlewares: [],
          },
        ],
      },
    ],
    middlewares: [],
  };
};

const routine = (request: ApiRequest): ApiResponse => {
  if (request.parameters.errorCode) {
    return {
      status: request.parameters.errorCode as ApiResponseStatus,
      payload: Buffer.from('{ "error": "Error processing the request"}'),
      payloadType: "json",
    };
  }
  const jsonPayload = request.payload.toString("utf8");
  const res = {
    ...request,
    payload: JSON.parse(jsonPayload),
  };
  return {
    status: "completed",
    payload: Buffer.from(`{"data": [], "request": ${JSON.stringify(res)}}`),
    payloadType: "json",
  };
};

export const MockApiError: Api = {
  name: "Mock Api",
  version: "0.0.1",
  description: undefined,
  resources: [
    {
      alias: "projects",
      name: "Projects",
      actions: [
        {
          alias: "get_projects",
          name: "Get Projects",
          type: "query",
          middlewares: [],
          routine: (request) => {
            throw Error("Internal Server Error");
          },
        },
      ],
      middlewares: [],
    },
  ],
};
export const MockApiRealApi: Api = {
  name: "Mock Api",
  version: "0.0.1",
  description: undefined,
  resources: [
    {
      alias: "projects",
      name: "Projects",
      actions: [
        {
          alias: "get_projects",
          name: "Get Projects",
          type: "query",
          middlewares: [],
          routine,
        },
        {
          alias: "get_project_by_id",
          name: "Get Project By Id",
          type: "get",
          middlewares: [],
          routine,
        },
        {
          alias: "create_project",
          name: "Create Project",
          type: "create",
          middlewares: [],
          routine,
        },
        {
          alias: "update_project",
          name: "Update Project",
          type: "update",
          middlewares: [],
          routine,
        },
        {
          alias: "delete_project",
          name: "Delete Project",
          type: "delete",
          middlewares: [],
          routine,
        },
        {
          alias: "patch_project",
          name: "Patch Project",
          type: "patch",
          middlewares: [],
          routine,
        },
        {
          alias: "sync_project",
          name: "Sync Project",
          type: "execute",
          middlewares: [],
          routine,
        },
      ],
      middlewares: [],
      resources: [
        {
          alias: "persons",
          name: "Persons",
          actions: [
            {
              alias: "get_persons",
              name: "Get Persons",
              type: "query",
              middlewares: [],
              routine,
            },
            {
              alias: "get_person_by_id",
              name: "Get Person By Id",
              type: "get",
              middlewares: [],
              routine,
            },
            {
              alias: "create_person",
              name: "Create Person",
              type: "create",
              middlewares: [],
              routine,
            },
            {
              alias: "update_person",
              name: "Update Person",
              type: "update",
              middlewares: [],
              routine,
            },
            {
              alias: "delete_person",
              name: "Delete Person",
              type: "delete",
              middlewares: [],
              routine,
            },
            {
              alias: "patch_person",
              name: "Patch Person",
              type: "patch",
              middlewares: [],
              routine,
            },
            {
              alias: "sync_person",
              name: "Sync Person",
              type: "execute",
              middlewares: [],
              routine,
            },
          ],
          middlewares: [],

          resources: [
            {
              alias: "permissions",
              name: "Permissions",
              actions: [
                {
                  alias: "get_permissions",
                  name: "Get Permissions",
                  type: "query",
                  middlewares: [],
                  routine,
                },
                {
                  alias: "get_permission_by_id",
                  name: "Get Permission By Id",
                  type: "get",
                  middlewares: [],
                  routine,
                },
                {
                  alias: "create_permission",
                  name: "Create Permission",
                  type: "create",
                  middlewares: [],
                  routine,
                },
                {
                  alias: "update_permission",
                  name: "Update Permission",
                  type: "update",
                  middlewares: [],
                  routine,
                },
                {
                  alias: "delete_permission",
                  name: "Delete Permission",
                  type: "delete",
                  middlewares: [],
                  routine,
                },
                {
                  alias: "patch_permission",
                  name: "Patch Permission",
                  type: "patch",
                  middlewares: [],
                  routine,
                },
                {
                  alias: "sync_permission",
                  name: "Sync Permission",
                  type: "execute",
                  middlewares: [],
                  routine,
                },
              ],
              middlewares: [],

              resources: [],
            },
          ],
        },
        {
          alias: "transactions",
          name: "Transactions",
          actions: [
            {
              alias: "get_transactions",
              name: "Get Transactions",
              type: "query",
              middlewares: [],
              routine,
            },
            {
              alias: "get_transaction_by_id",
              name: "Get Transaction By Id",
              type: "get",
              middlewares: [],
              routine,
            },
            {
              alias: "create_transaction",
              name: "Create Transaction",
              type: "create",
              middlewares: [],
              routine,
            },
            {
              alias: "update_transaction",
              name: "Update Transaction",
              type: "update",
              middlewares: [],
              routine,
            },
            {
              alias: "delete_transaction",
              name: "Delete Transaction",
              type: "delete",
              middlewares: [],
              routine,
            },
            {
              alias: "patch_transaction",
              name: "Patch Transaction",
              type: "patch",
              middlewares: [],
              routine,
            },
            {
              alias: "sync_transaction",
              name: "Sync Transaction",
              type: "execute",
              middlewares: [],
              routine,
            },
          ],
          middlewares: [],

          resources: [],
        },
      ],
    },
  ],
  middlewares: [],
};

export const MockApiActionRepeated: Api = {
  name: "Mock Api",
  version: "0.0.1",
  description: undefined,
  resources: [
    {
      alias: "projects",
      name: "Projects",
      actions: [],
      middlewares: [],
      resources: [
        {
          alias: "persons",
          name: "Persons",
          actions: [
            {
              alias: "get_persons",
              name: "Get Persons",
              type: "query",
              middlewares: [],
              routine,
            },
            {
              alias: "get_persons",
              name: "Get Persons",
              type: "query",
              middlewares: [],
              routine,
            },
          ],
          middlewares: [],
        },
      ],
    },
  ],
  middlewares: [],
};

export class MalformedRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}
const routineMalformedRequestError = (request: ApiRequest): ApiResponse => {
  throw new MalformedRequestError("Test Error MalformedRequestError");
};

export const MockApiCustomErrors: Api = {
  name: "Mock Api",
  version: "0.0.1",
  description: undefined,
  resources: [
    {
      alias: "errors",
      name: "Errors",
      actions: [
        {
          alias: "malformed_request_error",
          name: "malformed_request_error",
          type: "execute",
          middlewares: [],
          routine: routineMalformedRequestError,
        },
      ],
      middlewares: [],
    },
  ],
};
