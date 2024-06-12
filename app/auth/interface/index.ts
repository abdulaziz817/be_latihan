import { BaseResponseSuccess } from "@/lib/axiosClient";

interface User {
  id?: number;
  nama: string;
  email: string;
  password: string | undefined;
  username: string;
  refresh_token: string;
  access_token: string;
  avatar?: string;
  role: string | undefined | any;
}

export interface LoginPayload
  extends Pick<User, "username" | "password" | "role"> {}
export interface RegisterResponse extends BaseResponseSuccess {}

export interface RegisterPayload
  extends Pick<User, "nama" | "username" | "password" | "email" | "avatar" | "role"> {
  file?: File;
}

export interface LoginResponse extends BaseResponseSuccess {
  data: User;
}
export interface ResetPasswordPayload {
  new_password: string;
}
export interface LupaPasswordPayload extends Pick<User, "email"> {}
export interface ProfileResponse extends BaseResponseSuccess {
  data: User;
}

export interface ProfileUpdatePayload
  extends Pick<User, "nama" | "id" | "avatar"> {
  file?: File;
}
