import * as jwt from 'jsonwebtoken';
import User from '../../db/models/User';

const generateJwtToken = (user: User) => {
  return jwt.sign({ user: user.username, id: user.id }, process.env.JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '15m'
  });
};

export { generateJwtToken };
