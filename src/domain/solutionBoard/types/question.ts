import type { PageInfo } from "../../../shared/types/page";

// 카테고리 타입 정의
export type Category =
  | {
      type: "problem";
      id: string;
    }
  | {
      type: "testPaper";
      id: string;
    }
  | {
      type: "contest";
      id: string;
    }
  | {
      type: "free";
    }
  | {
      type: "notice";
    };

// 질문 글 타입 정의
export type QuestionPostItem = {
  id: string;
  title: string;
  category: Category;
  writer: string;
  commentNum: number;
  createdAt: string; // ISO 날짜 문자열
};

export interface QuestionPostsResponsePagination extends PageInfo {
  queryResults: QuestionPostItem[];
}
