import { useState } from "react";
import BoardNav from "./BoardNav";

function SolutionTestPaperBoardPage({ testPaperId }: { testPaperId?: string }) {
  const [searchType, setSearchType] = useState("문제집 번호");
  const [keyword, setKeyword] = useState(testPaperId ?? "");

  const handleSearch = () => {
    console.log(`검색: ${searchType} -> ${keyword}`);
    // 여기서 검색 API 호출 또는 필터링 로직 실행
  };

  return (
    <div className="w-full max-w-[1680px] mx-auto mt-24 px-4">
      <BoardNav title="문제집" />
      <div className="mt-6">
        {/* 여기서 activeTab에 따라 게시글 리스트 렌더링 */}탭 내용
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
          <option value="문제집 번호">문제집 번호</option>
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

export default SolutionTestPaperBoardPage;
