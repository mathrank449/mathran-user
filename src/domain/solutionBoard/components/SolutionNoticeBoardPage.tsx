import BoardNav from "./BoardNav";

function SolutionNoticeBoardPage() {
  return (
    <div className="w-full max-w-[1680px] mx-auto mt-24 px-4">
      <BoardNav title="공지" />
      <div className="mt-6">
        {/* 여기서 activeTab에 따라 게시글 리스트 렌더링 */}탭 내용
      </div>
    </div>
  );
}

export default SolutionNoticeBoardPage;
