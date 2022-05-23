import UserRepository from "../repositories/UserRepository";
import { LoginData } from "../models/auth";

class AuthService {
  public async login(
    username: string,
    password: string
  ): Promise<LoginData | null> {
    const data: LoginData | null = await UserRepository.login(
      username,
      password
    );

    if (data !== null) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken);
      localStorage.setItem("expireTime", data.expireTime);
      return data;
    } else {
      return null;
    }
  }
}

export default new AuthService();
