import bcrypt from 'bcrypt';
import Boom from 'boom';
import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import uuidv4 from 'uuid/v4';
import * as yup from 'yup';
import User from '../../db/models/User';
import { generateJwtToken } from './AuthUtils';

export class AuthEndpoints {
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let password_hash: string;

      const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
      });

      try {
        await schema.validate(req.body, { abortEarly: false });
      } catch (err) {
        return next(Boom.badRequest(err.message, err));
      }

      const { username, password } = req.body;

      try {
        password_hash = await bcrypt.hash(password, 10);
      } catch (err) {
        return next(Boom.badImplementation("Unable to generate 'password hash'"));
      }

      try {
        await req.services.authService.registerUser(username, password_hash!);
      } catch (err) {
        return next(Boom.unauthorized("The 'username' already exists"));
      }
    } catch (err) {
      return next(Boom.badImplementation('Unable to create user.'));
    }

    res.sendStatus(HttpStatus.OK);
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    let user: User;

    const schema = yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required()
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return next(Boom.badRequest(err.message, err));
    }

    try {
      user = await req.services.authService.getUser(req.body.username);
    } catch (err) {
      return next(Boom.unauthorized("Invalid 'username' or 'password'"));
    }

    if (!user) {
      return next(Boom.unauthorized("Invalid 'username' or 'password'"));
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return next(Boom.unauthorized("Invalid 'username' or 'password'"));
    }

    const jwt_token = generateJwtToken(user);
    const jwt_token_expiry = new Date(new Date().getTime() + 15 * 60 * 1000);

    const refresh_token = uuidv4();

    try {
      await req.services.authService.saveToken(user.id, refresh_token, new Date(new Date().getTime() + 30 * 60 * 1000));
    } catch (err) {
      return next(Boom.badImplementation("Could not update 'refresh token' for user"));
    }

    res.cookie('refresh_token', refresh_token, {
      maxAge: 30 * 60 * 1000, // convert from minute to milliseconds
      httpOnly: true,
      secure: false
    });

    res.json({ jwt_token, jwt_token_expiry });
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('refresh_token');
    res.sendStatus(HttpStatus.OK);
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const refresh_token = req.cookies['refresh_token'];

    let user: User | undefined;

    try {
      user = await req.services.authService.getUserByToken(refresh_token);
    } catch (err) {
      return next(Boom.unauthorized('invalid refresh token'));
    }

    const jwt_token = generateJwtToken(user!);
    const jwt_token_expiry = new Date(new Date().getTime() + 15 * 60 * 1000);

    const new_refresh_token = uuidv4();

    try {
      await req.services.authService.saveToken(
        user!.id,
        new_refresh_token,
        new Date(new Date().getTime() + 30 * 60 * 1000)
      );
    } catch (err) {
      return next(Boom.unauthorized("Invalid 'refresh_token' or 'user_id'"));
    }

    res.cookie('refresh_token', new_refresh_token, {
      maxAge: 30 * 60 * 1000, // convert from minute to milliseconds
      httpOnly: true,
      secure: false
    });

    res.json({ jwt_token, jwt_token_expiry });
  };
}
