import faker from 'faker';
import { AuthenticationParams } from '../usecases/authentication';

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default mockAuthentication;
