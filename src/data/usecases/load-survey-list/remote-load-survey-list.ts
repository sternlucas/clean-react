import { HttpGetClient } from '@/data/protocols/http';

export class RemoteLoadSurveyList {
  private readonly url: string;

  private readonly httpGetClient: HttpGetClient;

  constructor(url: string, httpGetClient: HttpGetClient) {
    this.url = url;
    this.httpGetClient = httpGetClient;
  }

  async loadAll(): Promise<void> {
    await this.httpGetClient.get({ url: this.url });
  }
}
