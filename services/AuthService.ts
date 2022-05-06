import axios from "@/utils/axios";
import loginAdapter from "@/adapters/login.adapter";
import { DefaultResponse } from "../models/response";
import { LoginData } from "../models/auth";

class AuthService {
  private path: string = "/admin/auth/";

  public async login(username: string, password: string): Promise<boolean> {
    const resp: DefaultResponse<LoginData> = await axios.post(
      this.path + "login",
      {
        email: username,
        password,
      }
    );

    if (resp.status) {
      const data = loginAdapter(resp.data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken);
      localStorage.setItem("expireTime", data.expireTime);
      return true;
    } else {
      return false;
    }
  }
}

export default new AuthService();
