import type { RankInfo } from "../types/rank";

function RankingItem({
  rankingItem,
  index,
}: {
  rankingItem: RankInfo;
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
          title={String(rankingItem.rank)}
        >
          {rankingItem.rank}
        </span>
      </div>
      <div className="inline-block align-middle w-[450px] text-center overflow-hidden truncate">
        <div className="flex flex-col gap-1 text-center">
          <span className="ml-2 text-md px-3 py-1 text-center rounded-xl border-solid border border-red-500 bg-red-500 text-white">
            {rankingItem.tier}
          </span>
          <span
            className="text-sm text-black whitespace-nowrap"
            title={String(rankingItem.memberInfo.nickName)}
          >
            {rankingItem.memberInfo.nickName}
          </span>
        </div>
      </div>
      <div className="inline-block align-middle w-[550px] text-center overflow-hidden truncate">
        {/* {testPaper.courseInfo.courseName} */}
        <span className="ml-2 text-sm  whitespace-nowrap">
          {rankingItem.score}
        </span>
      </div>
      <div className="inline-block align-middle w-[150px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={String(rankingItem.successCount)}
        >
          {rankingItem.successCount}
        </span>
      </div>
      <div className="inline-block align-middle w-[150px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={String(rankingItem.totalSubmittedCount)}
        >
          {rankingItem.totalSubmittedCount}
        </span>
      </div>
      <div className="inline-block align-middle w-[150px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={
            rankingItem.successCount > 0
              ? (
                  (rankingItem.successCount / rankingItem.totalSubmittedCount) *
                  100
                ).toFixed(3)
              : "0.000%"
          }
        >
          {rankingItem.successCount > 0
            ? (
                (rankingItem.successCount / rankingItem.totalSubmittedCount) *
                100
              ).toFixed(3)
            : "0.000"}
          %
        </span>
      </div>
    </div>
  );
}

export default RankingItem;
