import type { School } from "../../problem/types/school";

export type UserInfo = {
  accessToken: "string";
  userName: "string";
  isNewUser?: boolean;
};

export type Role = "USER" | "ADMIN" | "DEVELOPER"; // 예시, 실제 가능한 역할에 맞춰 수정
export type MemberType = "TEACHER" | "STUDENT" | "NORMAL"; // 예시, 실제 가능한 타입에 맞춰 수정

export type MemberInfo = {
  memberId: string;
  nickName: string;
};

export type UserDetailedInfo = {
  memberId: number;
  nickName: string;
  role: Role;
  memberType: MemberType;
  createdAt: string; // ISO 문자열
  agreeToPrivacyPolicy: boolean;
  pending: boolean;
  schoolDetail?: School;
};

export type BasicUserInfo = {
  nickName: string;
  role: Role;
  memberType: MemberType;
  agreeToPrivacyPolicy: boolean;
  schoolDetail?: School;
};

export type ProblemSolveInfo = {
  solvedSingleProblemIds: string[];
  failedSingleProblemIds: string[];
};
