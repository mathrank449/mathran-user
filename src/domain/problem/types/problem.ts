// types/problem.ts

import type { PastProblemType } from "../problem/types/problem";

export type ProblemType = "" | "MULTIPLE_CHOICE" | "SHORT_ANSWER";
export type ProblemKoreaType = "객관식" | "단답형";
export type DifficultyType =
  | ""
  | "KILLER"
  | "HIGH"
  | "MID_HIGH"
  | "MID"
  | "MID_LOW"
  | "LOW";
export type DifficultyKoreaType = "킬러" | "상" | "중상" | "중" | "중하" | "하";
export type CourseType = {
  coursePath: string;
  courseName: string;
};

export type Problem = {
  id?: string | null;
  registrant?: string;
  difficulty: DifficultyType;
  type: ProblemType;
  grade: CourseType;
  unitLarge: CourseType;
  unitMedium: CourseType;
  unitSmall: CourseType;
  coursePath: string;
  year: number;
  schoolCode: string;
  schoolName: string;
  location: string;
  detailedLocation?: string;
  problemImage?: File | null;
  problemImageUrl: string;
  answerImage?: File | null;
  answerImageUrl: string;
  answer: string[];
  answerVideoLink: string;
};

// 서버에서 받아오는 문제 응답 타입
export interface ProblemResponse {
  id: string;
  memberInfo: {
    memberId: string;
    memberName: string;
  };
  course: {
    target: CourseType;
    parents: CourseType[];
  };
  problemImage: string;
  solutionImage: string;
  difficulty: DifficultyType; // enum 필요 시 따로 분리 가능
  type: ProblemType;
  schoolInfo: {
    schoolName: string;
    schoolCode: string;
    schoolKind: string;
    schoolCity: string;
  };
  answers: string[];
  createdAt: string; // ISO 문자열
  year: number;
  solutionVideoLink: string;
}

export interface ScoreProblemResponse extends ProblemResponse {
  score: number;
}

export type QueryListType = {
  difficulty: DifficultyType | "";
  answerType: ProblemType | "";
  coursePath: string;
  location: string | "";
  year: string | "";
};

// 정답 데이터 타입 정의
export type ProblemSolution = {
  imageSource: string; // 문제 이미지 경로 (또는 원본 이미지)
  path: string; // 문제 경로 또는 식별용 경로
  difficulty: DifficultyType; // 난이도
  type: ProblemType; // 문제 유형
  pastProblem: PastProblemType; // 기출 여부
  answer: string[]; // 정답 배열 (객관식, 주관식 공통)
  createdAt: string; // 생성일
  year: number; // 연도
  solutionVideoLink: string; // 풀이 영상 링크
  solutionImage: string; // 풀이 이미지 (해설 이미지)
};
