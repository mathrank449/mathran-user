import { useState } from "react";
import BoardNav from "./BoardNav";
import type { QuestionPostsResponsePagination } from "../types/question";
import Pagination from "../../../shared/components/Pagination";
import QuestionItem from "../list/components/QuestionItem";
import QuestionListHeader from "../list/components/QuestionListHeader";

const questionListResponse = [
  {
    id: "1",
    title: "안되는 이유를 맞춰보시오[5점]",
    category: {
      type: "problem",
      id: "1",
    } as const,
    writer: "ttcori",
    commentNum: 10,
    createdAt: "2025-09-19T20:15:00Z",
  },
  {
    id: "2",
    title: "이 코드의 시간복잡도를 구하시오[10점]",
    category: {
      type: "testPaper",
      id: "2000",
    } as const,
    writer: "sungho",
    commentNum: 5,
    createdAt: "2025-09-18T14:22:00Z",
  },
  {
    id: "3",
    title: "다음 대회 문제에 대한 풀이를 공유해주세요",
    category: {
      type: "contest",
      id: "3000",
    } as const,
    writer: "cori_dev",
    commentNum: 8,
    createdAt: "2025-09-17T09:10:00Z",
  },
  {
    id: "4",
    title: "자유롭게 질문 남겨주세요",
    category: {
      type: "free",
    } as const,
    writer: "alice",
    commentNum: 2,
    createdAt: "2025-09-16T20:00:00Z",
  },
  {
    id: "5",
    title: "[공지] 9월 스터디 일정 안내",
    category: {
      type: "notice",
    } as const,
    writer: "admin",
    commentNum: 0,
    createdAt: "2025-09-15T12:00:00Z",
  },
];

function SolutionBoardPage() {
  const [questionListPagination, setQuestionListPagination] =
    useState<QuestionPostsResponsePagination>({
      queryResults: questionListResponse,
      currentPageNumber: 1,
      possibleNextPageNumbers: [],
    });
  const [page, setPage] = useState(1);
  const [searchType, setSearchType] = useState("작성자");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    console.log(`검색: ${searchType} -> ${keyword}`);
    // 여기서 검색 API 호출 또는 필터링 로직 실행
  };

  return (
    <div className="w-full max-w-[1680px] mx-auto mt-24 px-4">
      <BoardNav title="전체" />
      <div className="mt-6">
        <QuestionListHeader />
        {questionListPagination.queryResults.map((question, index) => (
          <QuestionItem question={question} index={index} />
        ))}
        {questionListPagination && (
          <Pagination
            pageInfo={{
              currentPageNumber: questionListPagination?.currentPageNumber,
              possibleNextPageNumbers:
                questionListPagination?.possibleNextPageNumbers,
            }}
            setPage={setPage}
          />
        )}
      </div>

      {/* 검색 UI */}
      <div className="flex items-center mt-6 space-x-2 w-[600px] mx-auto">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="작성자">작성자</option>
          <option value="제목">글제목</option>
        </select>

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={handleSearch}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 cursor-pointer"
        >
          검색
        </button>
      </div>
    </div>
  );
}

export default SolutionBoardPage;
