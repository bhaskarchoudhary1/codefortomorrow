import { AuthUser } from "../models/authuser.seq.model";
import { PasswordUtil } from "../utils/utils.bcrypt";
import { Op } from "sequelize";

export class UserRepo {
  async getUserDataByEmail(email: string) {
    return new Promise<any>((res, rej) => {
      AuthUser.findOne({
        where: { email },
      })
        .then((user: any) => {
          res(user);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
  async getUserDataById(id: number) {
    return new Promise<any>((res, rej) => {
      AuthUser.findOne({
        where: { id },
      })
        .then((user: any) => {
          res(user);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async register(user: any) {
    return new Promise<any>((res, rej) => {
      const passwordUtil = new PasswordUtil(user.password);
      user.password = passwordUtil.getHash();
      AuthUser.create({
        email: user.email,
        full_name: user.full_name,
        password: user.password
      })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

}
