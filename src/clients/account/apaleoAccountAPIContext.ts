import * as coreHttp from "@azure/core-http";
import { ApaleoAccountAPIOptionalParams } from "./models";

const packageName = "ApaleoAccountAPI";
const packageVersion = "1.0.0";

export class ApaleoAccountAPIContext extends coreHttp.ServiceClient {
  $host: string;

  /**
   * Initializes a new instance of the ApaleoAccountAPIContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    $host: string,
    options?: ApaleoAccountAPIOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if ($host === undefined) {
      throw new Error("'$host' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(credentials, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "{$host}";

    // Parameter assignments
    this.$host = $host;
  }
}
