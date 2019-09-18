import Sequelize, { Association, DataTypes, Model } from 'sequelize';
import sequelize from '../';
import User from './User';

class RefreshToken extends Model<RefreshToken> {
  public id!: number;
  public token!: string;
  public expires_at!: Date;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly user?: User;

  public static associations: {
    user: Association<RefreshToken, User>;
  };
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
      autoIncrement: true,
      primaryKey: true
    },
    token: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    expires_at: { type: DataTypes.DATE, allowNull: false, validate: { notEmpty: true } },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      unique: true,
      allowNull: false
    }
  },
  { sequelize, modelName: 'refresh_token' }
);

RefreshToken.belongsTo(User);

export default RefreshToken;
