import { SetStorage } from '../protocols/cache/set-storage';

export class SetStorageMock implements SetStorage {
  key: string;

  value: unknown;

  set(key: string, value: unknown): Promise<void> {
    this.key = key;
    this.value = value;

    return Promise.resolve();
  }
}
