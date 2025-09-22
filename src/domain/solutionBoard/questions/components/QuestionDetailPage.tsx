// SolutionBoardPage.tsx
import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import type { Question } from "../types/question";
import ReadOnlyReactQuillEditor from "../../write/components/ReadOnlyReactQuillEditor";
import CommentBox from "./CommentBox";
import ReactQuillEditor from "../../write/components/ReactQuillEditor";

const questionData = {
  id: "1",
  title: "안되는 이유를 맞춰보시오[5점]",
  category: {
    type: "problem",
    id: "1",
  } as const,
  writer: "ttcori",
  contents: "<p>21312312321</p>",
  createdAt: "2025-09-19T20:15:00Z",
  comments: [
    {
      id: "1",
      writer: "ddri",
      contents: "123",
      createdAt: "2025-09-19T20:15:00Z",
    },
    {
      id: "1",
      writer: "ddri",
      contents: "123",
      createdAt: "2025-09-19T20:15:00Z",
    },
    {
      id: "1",
      writer: "ddri",
      contents: "123",
      createdAt: "2025-09-19T20:15:00Z",
    },
  ],
};

function QuestionDetailPage({ questionId }: { questionId: string }) {
  console.log(questionId);
  const quillRef = useRef<ReactQuill>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState<Question>(questionData);
  const [isWritingComment, setIsWritingComment] = useState(false);

  return (
    <div className="w-full max-w-[1680px] mx-auto mt-24 px-4">
      <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
        {/* 제목 입력 */}
        <span className="text-4xl font-semibold py-4 px-3">
          {question.id}. {question.title}
        </span>

        {/* 카테고리 & 문제 번호 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-medium text-lg whitespace-nowrap mr-4">
              카테고리
            </span>
            {question.category.type === "free" && (
              <span className="text-sm text-black-500 whitespace-nowrap mr-4">
                자유
              </span>
            )}

            {question.category.type === "notice" && (
              <span className="text-sm text-red-500 whitespace-nowrap mr-4">
                공지
              </span>
            )}

            {question.category.type === "problem" && (
              <a
                className="text-lg text-blue-500 whitespace-nowrap mr-4"
                href={`/problems/${question.category.id}`}
              >
                문제
              </a>
            )}

            {question.category.type === "testPaper" && (
              <a
                className="text-sm text-blue-500 whitespace-nowrap mr-4"
                href={`/teatPapers/${question.category.id}`}
              >
                시험지
              </a>
            )}

            {question.category.type === "contest" && (
              <a
                className="text-sm text-blue-500 whitespace-nowrap mr-4"
                href={`/contests/${question.category.id}`}
              >
                대회
              </a>
            )}
          </div>
          {question.category.type === "problem" && (
            <div className="flex items-center gap-4">
              <span className="font-medium">문제 번호</span>
              <span className="px-3 py-2 w-32">{question.category.id}</span>
            </div>
          )}
          {question.category.type === "testPaper" && (
            <div className="flex items-center gap-4">
              <span className="font-medium">문제집 번호</span>
              <span className="px-3 py-2 w-32">{question.category.id}</span>
            </div>
          )}
          {question.category.type === "contest" && (
            <div className="flex items-center gap-4">
              <span className="font-medium">대회 번호</span>
              <span className="px-3 py-2 w-32">{question.category.id}</span>
            </div>
          )}
        </div>

        {/* 에디터 */}
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
          <ReadOnlyReactQuillEditor contents={question.contents} />
        </div>
        <div className="flex flex-col gap-4">
          {question.comments.map((comment) => (
            <CommentBox comment={comment} />
          ))}
        </div>
        <div className="text-center">
          <button
            className={`my-3 mt-16 cursor-pointer px-3 py-2 rounded-lg shadow transition
    ${
      isWritingComment
        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }
  `}
            disabled={isWritingComment}
            onClick={() => {
              setIsWritingComment(true);
              // 댓글 입력 창으로 스크롤

              // 버튼 클릭 시
              setTimeout(() => {
                if (commentsEndRef.current) {
                  commentsEndRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }, 100);
            }}
          >
            댓글 작성
          </button>
          {isWritingComment && (
            <div ref={commentsEndRef}>
              <ReactQuillEditor ref={quillRef} />
              <button
                className="my-3 mt-16 cursor-pointer px-3 py-2 rounded-lg shadow transition bg-blue-500 text-white"
                onClick={() => {
                  setIsWritingComment(true);
                }}
              >
                저장
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetailPage;
