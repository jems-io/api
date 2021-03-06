import { ApiRequest, ApiResponse } from "../../../domain/models";
import { ApiResourceActionPipelineService } from "../../../domain/services";
import { MockApiResponseComplete, MockApiResponseError } from "../models";

export class MockResourceActionPipelineService
  implements ApiResourceActionPipelineService
{
  pipe(actionId: string, request: ApiRequest): Promise<ApiResponse> {
    if (actionId === "0") {
      return Promise.resolve(MockApiResponseComplete);
    }
    return Promise.resolve(MockApiResponseError);
  }
}
