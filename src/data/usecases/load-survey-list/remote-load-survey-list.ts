import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';

export class RemoteLoadSurveyList {
  private readonly url: string;

  private readonly httpGetClient: HttpGetClient;

  constructor(url: string, httpGetClient: HttpGetClient) {
    this.url = url;
    this.httpGetClient = httpGetClient;
  }

  async loadAll(): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      default:
        throw new UnexpectedError();
    }
  }
}
