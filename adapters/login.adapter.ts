import { LoginData } from "../models/auth";

export default function (object: any): LoginData {
  return {
    refreshToken: object.refresh_token,
    expireTime: object.expire,
    token: object.token,
  };
}
