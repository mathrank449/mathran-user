// SolutionBoardPage.tsx
import { useRef, useState } from "react";
import ReactQuillEditor from "./ReactQuillEditor";
import ReactQuill from "react-quill-new";

function WritingQuestionPage() {
  const quillRef = useRef<ReactQuill>(null);
  const [questionCategory, setQuestionCategory] = useState("problem");

  return (
    <div className="w-full max-w-[1680px] mx-auto mt-24 px-4">
      <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
        {/* 제목 입력 */}
        <input
          className="text-4xl font-semibold py-4 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="제목을 입력하세요."
        />

        {/* 카테고리 & 문제 번호 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="category" className="font-medium">
              카테고리
            </label>
            <select
              id="category"
              name="category"
              value={questionCategory} // 상태와 연결
              onChange={(e) => setQuestionCategory(e.target.value)} // 선택 변경 시 상태 업데이트
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="problem">문제 질문</option>
              <option value="testPaper">문제집 질문</option>
              <option value="contest">대회 질문</option>
              <option value="free">자유</option>
            </select>
          </div>
          {questionCategory === "problem" && (
            <div className="flex items-center gap-4">
              <span className="font-medium">문제 번호</span>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-32"
              />
            </div>
          )}
          {questionCategory === "testPaper" && (
            <div className="flex items-center gap-4">
              <span className="font-medium">문제집 번호</span>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-32"
              />
            </div>
          )}
          {questionCategory === "contest" && (
            <div className="flex items-center gap-4">
              <span className="font-medium">대회 번호</span>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-32"
              />
            </div>
          )}
        </div>

        {/* 에디터 */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <ReactQuillEditor ref={quillRef} />
        </div>
        <div className="flex justify-center gap-6">
          <button className="my-3 cursor-pointer px-3 py-2 rounded-lg shadow transition bg-blue-500 text-white">
            글 쓰기
          </button>
          <button className="my-3 cursor-pointer px-3 py-2 rounded-lg shadow transition bg-blue-500 text-white">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default WritingQuestionPage;
