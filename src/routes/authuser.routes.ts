import { Express } from "express";
import { AuthController } from "../controllers/Auth.controllers";
import validate from "../requests/user.request";
import validToken from "../middleware/auth.jwt.middleware"
const user = new AuthController();

export function AuthUserRoutes(app: Express) {
  app.post("/register", validate("register"), user.register);
  app.post("/logIn", validate("login"), user.login);
  app.post("/logOut",validToken, user.logOut);

}

