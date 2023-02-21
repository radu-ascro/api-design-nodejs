import * as user from '../user';

describe('user handler', () => {
  it('should create a new user', async () => {
    const req = { body: { username: 'hello', password: 'hi' } };
    const res = {
      // @ts-ignore
      json({ token }) {
        console.log(token);
        expect(token).toBeTruthy();
      },
    };
    // @ts-ignore
    await user.createNewUser(req, res, () => {});
  });
});
