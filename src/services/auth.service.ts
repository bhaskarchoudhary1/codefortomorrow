
import { UserRepo } from "../repository/user.repo";
import JWTRedis from "../utils/auth.jwt";
import { PasswordUtil } from "../utils/utils.bcrypt";
const jwt = new JWTRedis();

export class AuthService {
  constructor(
    private readonly userRepo: UserRepo
  ) { }

  async register(body:any): Promise<any> {
    const userDetails = await this.userRepo.getUserDataByEmail(body.email);
    if (!userDetails) {
      const userRegister = await this.userRepo.register(body);
      if (!userRegister) {
        return {
          success: false,
          status: 400,
          msg: "User not register",
        };
      }
      const tokenInfo = await jwt.createToken(userRegister);
      return {
        success: true,
        status: 200,
        msg: "user register successfully.",
        data: userRegister,
        tokenInfo,
      };
    }
  }

  async logIn(body: any): Promise<any> {
    const { email, password } = body;
    if (email == "admin@codesfortomorrow.com") {
      const userDetails = await this.userRepo.getUserDataByEmail(email);
      if (!userDetails) {
        return {
          success: false,
          status: 404,
          msg: "user details not found",
        };
      }
      const passwordUtil = new PasswordUtil(password);
      const passwordIsValid = passwordUtil.compareHash(userDetails.password);
      if (!passwordIsValid) {
        return {
          success: false,
          status: 401,
          msg: "password is not match",
        };
      } else {
        const tokenInfo = await jwt.createToken(userDetails);
        userDetails.isLoggedIn = true;
        return {
          success: true,
          status: 200,
          msg: " Login successfully",
          data: userDetails,
          tokenInfo,
        };
      }
    }else{
      return {
        success: false,
        status: 404,
        msg: "user credential is not valid",
      };
    }
    }

    async logOut(id): Promise<any> {
        const userDetails = await this.userRepo.getUserDataById(id);
        if (!userDetails) {
          return {
            success: false,
            status: 404,
            msg: "user details not found",
          };
        }
        userDetails!.isLoggedIn = false;
        await userDetails!.save();
        return {
          success: true,
          status: 200,
          msg: "user logged out",
        };
      }

}
