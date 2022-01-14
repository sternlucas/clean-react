import { SetStorage } from '@/data/protocols/cache/set-storage';
import { UnexpectedError } from '@/domain/errors';
import { SaveAccessToken } from '@/domain/usecases/save-access-token';

export class LocalSaveAccessToken implements SaveAccessToken {
  private readonly setStorage: SetStorage;

  constructor(setStorage: SetStorage) {
    this.setStorage = setStorage;
  }

  async save(accessToken: string): Promise<void> {
    if (!accessToken) {
      throw new UnexpectedError();
    }

    await this.setStorage.set('accessToken', accessToken);
  }
}
