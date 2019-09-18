import Sequelize, { DataTypes, Model } from 'sequelize';
import sequelize from '../';

class User extends Model<User> {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
      autoIncrement: true,
      primaryKey: true
    },
    username: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { notEmpty: true } },
    password: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  },
  { sequelize, modelName: 'user' }
);

export default User;
