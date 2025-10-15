import { AxiosError } from "axios";
import instance from "../../../shared/apis/instance";
import type {
  RankInfoPagination,
  SchoolRankInfoPagination,
  UserRankInfo,
} from "../types/rank";

export const getRankByMemberId = async (
  memberId: string
): Promise<UserRankInfo> => {
  try {
    const { data } = await instance.get(`/v1/rank?memberId=${memberId}`);

    return data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      throw e.response.data;
    }
    throw e;
  }
};

export const getRankAll = async (page: number): Promise<RankInfoPagination> => {
  try {
    const { data } = await instance.get(
      `/v1/rank/all?pageSize=10&pageNumber=${page}`
    );

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

export const getSchoolRankAll = async (
  page: number
): Promise<SchoolRankInfoPagination> => {
  try {
    const { data } = await instance.get(
      `/v1/rank/schools?pageSize=10&pageNumber=${page}`
    );

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
