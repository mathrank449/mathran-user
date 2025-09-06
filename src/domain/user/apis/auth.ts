import instance from "../../../shared/apis/instance";
import type { OauthInfo } from "../types/oauth";
import type { BasicUserInfo, UserInfo } from "../types/user";
import axios from "axios";

export const login = async (oauthInfo: OauthInfo): Promise<UserInfo> => {
  try {
    const { data } = await instance.get<UserInfo>(
      `v1/auth/login/oauth/${oauthInfo.provider}?code=${oauthInfo.code}&state=${oauthInfo.state}`
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

export const logout = async () => {
  try {
    const { data } = await instance.post(`/v1/auth/logout`);
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

export const refreshToken = async (): Promise<UserInfo> => {
  try {
    const { data } = await instance.post("/v1/auth/login/refresh");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const register = async (registerInfo: BasicUserInfo) => {
  try {
    const { data } = await instance.put("/v1/member/registration", {
      nickName: registerInfo.nickName,
      memberType: registerInfo.memberType,
      schoolCode:
        registerInfo.schoolDetail === undefined
          ? null
          : registerInfo.schoolDetail.schoolCode,
      agreeToPrivacyPolicy: registerInfo.agreeToPrivacyPolicy,
    });
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
