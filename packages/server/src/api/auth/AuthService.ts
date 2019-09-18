import RefreshToken from '../../db/models/RefreshToken';
import User from '../../db/models/User';

export class AuthService {
  public registerUser = async (username: string, password_hash: string) => {
    try {
      await User.create({ username, password: password_hash });
    } catch (err) {
      throw err;
    }
  };

  public getUser = async (username: string) => {
    try {
      const user = await User.findAll({ where: { username } });
      return user[0];
    } catch (err) {
      throw err;
    }
  };

  public saveToken = async (userId: number, token: string, expires_at: Date) => {
    try {
      await RefreshToken.upsert({ userId, token, expires_at });
    } catch (err) {
      throw err;
    }
  };

  public getUserByToken = async (token: string) => {
    try {
      const res = await RefreshToken.findAll({ where: { token }, include: [{ model: User }] });
      return res[0].user;
    } catch (err) {
      throw err;
    }
  };
}
