import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number | undefined | null;
      email: string | undefined | null;
      role: string | undefined | null | unknown;
      name: string | undefined | null;
      username: string | undefined | null | unknown;
      kelas: string | undefined | null | unknown;
      jabatan: string | undefined | null | unknown;
      accessToken: any;
      refreshToken: any;
      token: any;
    };
  }
}
