import { useEffect, useRef, useState } from "react";
import type { Comment } from "../../types/question";
import ReadOnlyCommentReactQuillEditor from "./ReadOnlyCommentReactQuillEditor";
import { getUserInfo } from "../../../../user/apis/user";
import { deleteComment, modifyComment } from "../apis/comment";
import ReactQuillEditor from "../../../write/components/ReactQuillEditor";
import type ReactQuill from "react-quill-new";

function CommentBox({ comment }: { comment: Comment }) {
  const quillRef = useRef<ReactQuill>(null);
  const formattedDate = new Date(comment.createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [isMyQuestion, setIsMyQuestion] = useState(false);
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserInfo();
      if (userInfo.memberId === comment.memberInfo.memberId) {
        setIsMyQuestion(true);
      }
    };
    fetchData();
  }, [comment]);

  const handleDeleteCommentButton = async () => {
    try {
      await deleteComment(comment.commentId);
      window.location.reload();
    } catch (e) {
      alert("댓글 삭제에 실패하였습니다.");
      console.log(e);
    }
  };

  const handleModifyCommentButton = async () => {
    try {
      await modifyComment(
        comment.commentId,
        quillRef.current?.getEditor().root.innerHTML ?? ""
      );

      window.location.reload();
    } catch (e) {
      alert("댓글 삭제에 실패하였습니다.");
      console.log(e);
    }
  };

  return (
    <div className="border-gray-300 border-[1.5px]">
      <div className="bg-[#f5f5f5] p-2 border-gray-300 border-b-[1.5px] flex items-center">
        <div className="flex-1">
          <span className="font-semibold text-gray-700 px-4">
            {comment.memberInfo.nickName}
          </span>
          <span className="font-semibold text-gray-700">{formattedDate}</span>
        </div>

        {isModify ? (
          <div className="flex gap-2">
            {isMyQuestion && (
              <button
                type="button"
                className="cursor-pointer px-3 py-2 rounded-lg shadow transition bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleModifyCommentButton}
              >
                수정 완료
              </button>
            )}
            {isMyQuestion && (
              <button
                type="button"
                className="cursor-pointer px-3 py-2 rounded-lg shadow transition bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => {
                  setIsModify(false);
                }}
              >
                취소
              </button>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            {isMyQuestion && (
              <button
                type="button"
                className="cursor-pointer px-3 py-2 rounded-lg shadow transition bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => {
                  setIsModify(true);
                }}
              >
                댓글 수정
              </button>
            )}
            {isMyQuestion && (
              <button
                type="button"
                className="cursor-pointer px-3 py-2 rounded-lg shadow transition bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleDeleteCommentButton}
              >
                댓글 삭제
              </button>
            )}
          </div>
        )}
      </div>

      {isModify ? (
        <ReactQuillEditor ref={quillRef} value={comment.content} />
      ) : (
        <ReadOnlyCommentReactQuillEditor contents={comment.content} />
      )}
    </div>
  );
}

export default CommentBox;
