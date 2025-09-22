import type { QuestionPostItem } from "../../types/question";

function QuestionItem({
  question,
  index,
}: {
  question: QuestionPostItem;
  index: number;
}) {
  return (
    <div
      className={`w-[1650px] whitespace-nowrap py-3 border-solid border-[#DEDEDE] border-2 border-t-0 ${
        index % 2 === 0 ? "bg-white " : " bg-gray-100"
      }`}
    >
      <div className="inline-block align-middle w-[200px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={String(question.id)}
        >
          {question.id}
        </span>
      </div>
      <div className="inline-block align-middle w-[550px] text-center overflow-hidden truncate">
        <a
          className="text-sm text-blue-500 whitespace-nowrap mr-4"
          title={String(question.title)}
          href={`/questions/${question.id}`}
        >
          {question.title}
        </a>
      </div>
      <div className="inline-block align-middle w-[400px] text-center overflow-hidden truncate">
        {(question.category.type === "free" ||
          question.category.type === "notice") && (
          <span
            className="text-sm text-blue-500 whitespace-nowrap mr-4"
            title={String(question.category.type)}
          >
            {question.category.type}
          </span>
        )}

        {question.category.type === "problem" && (
          <a
            className="text-sm text-blue-500 whitespace-nowrap mr-4"
            href={`/problems/${question.category.id}`}
          >
            [문제] {question.category.id}
          </a>
        )}

        {question.category.type === "testPaper" && (
          <a
            className="text-sm text-blue-500 whitespace-nowrap mr-4"
            href={`/teatPapers/${question.category.id}`}
          >
            [시험지] {question.category.id}
          </a>
        )}

        {question.category.type === "contest" && (
          <a
            className="text-sm text-blue-500 whitespace-nowrap mr-4"
            href={`/contests/${question.category.id}`}
          >
            [대회] {question.category.id}
          </a>
        )}
      </div>
      <div className="inline-block align-middle w-[150px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={String(question.writer)}
        >
          {question.writer}
        </span>
      </div>
      <div className="inline-block align-middle w-[150px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={String(question.commentNum)}
        >
          {question.commentNum}
        </span>
      </div>
      <div className="inline-block align-middle w-[200px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={String(question.createdAt)}
        >
          {new Date(question.createdAt)
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\s/g, "")}
        </span>
      </div>
    </div>
  );
}

export default QuestionItem;
