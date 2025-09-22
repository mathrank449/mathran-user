import type { Comment } from "../types/question";

function CommentBox({ comment }: { comment: Comment }) {
  const formattedDate = new Date(comment.createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="border-gray-300 border-[1.5px]">
      <div className="bg-[#f5f5f5] p-2 border-gray-300 border-b-[1.5px]">
        <span className="font-semibold text-gray-700 px-4">
          {comment.writer}
        </span>
        <span className="font-semibold text-gray-700">{formattedDate}</span>
      </div>
      <div className="text-gray-800 p-4">{comment.contents}</div>
    </div>
  );
}

export default CommentBox;
