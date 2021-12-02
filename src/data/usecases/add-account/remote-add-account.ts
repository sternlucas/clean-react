import { HttpPostClient } from '@/data/protocols/http';
import { AccountModel } from '@/domain/models';
import { AddAccount, AddAccountParams } from '@/domain/usecases';

export class RemoteAddAccount implements AddAccount {
  constructor(
    url: string,
    httpPostClient: HttpPostClient<AddAccountParams, AccountModel>,
  ) {
    this.url = url;
    this.httpPostClient = httpPostClient;
  }

  private readonly url: string;

  private readonly httpPostClient: HttpPostClient<
    AddAccountParams,
    AccountModel
  >;

  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    return null;
  }
}
