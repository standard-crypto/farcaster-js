import { NeynarV1APIClient } from './v1/';
import { NeynarV2APIClient } from './v2/';
import { AxiosInstance } from 'axios';
import { silentLogger, Logger } from './logger';

export class NeynarAPIClient {
  private readonly logger: Logger;

  public readonly clients: {
    v1: NeynarV1APIClient
    v2: NeynarV2APIClient
  };

  /**
   * Instantiates a NeynarAPIClient
   *
   * Creates NeynarV1APIClient and NeynarV2APIClients
   */
  constructor(
    apiKey: string,
    {
      logger = silentLogger,
      axiosInstance,
    }: { logger?: Logger, axiosInstance?: AxiosInstance } = {},
  ) {
    this.logger = logger;

    if (apiKey === '') {
      throw new Error(
        'Attempt to use an authenticated API method without first providing an api key',
      );
    }
    this.clients = {
      v1: new NeynarV1APIClient(apiKey, { logger, axiosInstance }),
      v2: new NeynarV2APIClient(apiKey, { logger, axiosInstance }),
    };
  }
}
