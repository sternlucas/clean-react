import faker from 'faker';
import { HttpPostParams } from '../protocols/http';

export const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});
