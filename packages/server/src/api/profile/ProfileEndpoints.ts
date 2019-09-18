import Boom = require('boom');
import { NextFunction, Request, Response } from 'express';

export class ProfileEndpoints {
  public getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      console.log(req.user);
      // @ts-ignore
      const user = await req.services.profileService.getUserById(req.user.id);
      if (user) {
        const { id, username } = user;
        res.json({ id, username });
      } else {
        return next(Boom.notFound('User does not exist.'));
      }
    } catch (err) {
      return next(Boom.notFound('User does not exist.1'));
    }
  };
}
