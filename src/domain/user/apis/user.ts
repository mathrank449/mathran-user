import { AxiosError } from "axios";
import instance from "../../../shared/apis/instance";
import type { ProblemSolveInfo, UserDetailedInfo } from "../types/user";

export const getUserInfo = async (): Promise<UserDetailedInfo> => {
  try {
    const { data } = await instance.get<UserDetailedInfo>("/v1/member/info/my");
    console.log(data);
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      // e.response?.data가 있으면 서버 에러 메시지 반환
      throw e.response?.data ?? e.message;
    }
    throw e;
  }
};

export const modifyUserInfo = async (userDetailedInfo: UserDetailedInfo) => {
  try {
    const { data } = await instance.put<UserDetailedInfo>(
      "/v1/member/info/my",
      {
        userNickName: userDetailedInfo.nickName,
        memberType: userDetailedInfo.memberType,
        schoolCode:
          userDetailedInfo.schoolDetail === undefined
            ? null
            : userDetailedInfo.schoolDetail.schoolCode,
        agreeToPolicy: userDetailedInfo.agreeToPrivacyPolicy,
      }
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      // e.response?.data가 있으면 서버 에러 메시지 반환
      throw e.response?.data ?? e.message;
    }
    throw e;
  }
};

export const getMyProblemSolveInfo = async (): Promise<ProblemSolveInfo> => {
  try {
    const { data } = await instance.get<ProblemSolveInfo>(
      "/v1/problem/single/my"
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      // e.response?.data가 있으면 서버 에러 메시지 반환
      throw e.response?.data ?? e.message;
    }
    throw e;
  }
};

export const deleteMemberAccount = async (memberId: string) => {
  try {
    await instance.delete(`/v1/member/${memberId}`);
  } catch (e) {
    if (e instanceof AxiosError) {
      // e.response?.data가 있으면 서버 에러 메시지 반환
      throw e.response?.data ?? e.message;
    }
    throw e;
  }
};

export const getMyOrderlist = async (page: number) => {
  try {
    const { data } = await instance.get(
      `/v1/content/orders/my?pageNumber=${page}&pageSize=10&orderStatus=SUCCEEDED`
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
