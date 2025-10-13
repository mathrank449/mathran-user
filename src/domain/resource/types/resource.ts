import type { FileInfo, FileRealInfo } from "../../../shared/types/file";
import type { PageInfo } from "../../../shared/types/page";

export type ResourceType = "testPaper" | "schoolPaper" | "video";
export type ServerResourceType = "VIDEO" | "WORKBOOK" | "NAESIN_WORKBOOK";

// 질문 글 타입 정의
export type ResourceItemType = {
  resourceId: string;
  resourceType: ResourceType;
  title: string;
  price: number;
  createdAt: string; // ISO 날짜 문자열
};

// 질문 글 타입 정의
export type ResourceServerItemType = {
  contentId: string;
  contentType: ServerResourceType;
  title: string;
  price: number;
  createdAt: string; // ISO 날짜 문자열
};

export interface ResourcesResponsePagination extends PageInfo {
  queryResults: ResourceItemType[];
}

export type ResourceQueryType = {
  resourceType: ResourceType | "all";
  title: string;
};

export type PostResourceType = {
  resourceType: ResourceType;
  title: string;
  text: string;
  price: number;
  file?: FileInfo[];
  videoLinks?: string[];
};

export type ResourceDeatiledType = {
  resourceId: string;
  resourceType: ResourceType;
  title: string;
  text: string;
  fileInfos?: FileRealInfo[];
  videoLinks?: string[];
};
