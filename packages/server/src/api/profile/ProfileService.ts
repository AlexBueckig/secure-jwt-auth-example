import User from '../../db/models/User';

export class ProfileService {
  public getUserById = async (id: number) => {
    console.log(id);
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (err) {
      throw err;
    }
  };
}
