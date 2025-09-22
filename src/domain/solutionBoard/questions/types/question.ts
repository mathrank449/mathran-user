import type { Category } from "../../types/question";

// 질문 글 타입 정의
export type Question = {
  id: string;
  title: string;
  category: Category;
  writer: string;
  contents: string;
  comments: Comment[];
  createdAt: string; // ISO 날짜 문자열
};

export type Comment = {
  id: string;
  writer: string;
  contents: string;
  createdAt: string;
};
