import { Request, Response } from "express";
import {validationResult} from 'express-validator';
import { AuthService } from "../services/auth.service";
import { UserRepo } from "../repository/user.repo";
const authService = new AuthService(new UserRepo());

export class AuthController {
  constructor() { }
  async register(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const arg = await authService.register(req.body);
    return res.status(arg.status).json(arg);
  }

  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const arg = await authService.logIn(req.body);
    return res.status(arg.status).json(arg);
  }
  async logOut(req: Request, res: Response) {
    const Id = req.params?.id;
    const arg = await authService.logOut(Id);
    return res.status(arg.status).json(arg);
  }
}
