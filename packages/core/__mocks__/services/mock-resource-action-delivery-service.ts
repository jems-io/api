import { ApiRuntimeContext } from "../../../domain/models";
import { ApiDeliveryService } from "../../../domain/services";

export class MockResourceActionDeliveryService implements ApiDeliveryService {
  isStarted: boolean = false;

  start(apiRuntimeContext: ApiRuntimeContext): Promise<void> {
    this.isStarted = true;
    return Promise.resolve(undefined);
  }

  stop(): Promise<void> {
    this.isStarted = false;
    return Promise.resolve(undefined);
  }
}
