import instance from "../../../apis/instance";
import type { OauthInfo } from "../types/oauth";
import type { userInfo } from "../types/user";
import axios from "axios";

export const login = async (oauthInfo: OauthInfo): Promise<userInfo> => {
  try {
    const { data } = await instance.get<userInfo>(
      `/api/v1/auth/login/oauth/${oauthInfo.provider}?code=${oauthInfo.code}&state=${oauthInfo.state}`
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "OAuth login failed");
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred during login");
  }
};
