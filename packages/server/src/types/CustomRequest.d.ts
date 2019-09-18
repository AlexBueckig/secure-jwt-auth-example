import 'express';
import { AuthService } from '../api/auth/AuthService';
import { ProfileService } from '../api/profile/ProfileService';

export interface RequestServices {
  authService: AuthService;
  profileService: ProfileService;
}

declare global {
  namespace Express {
    interface Request {
      services: RequestServices;
    }
  }
}
