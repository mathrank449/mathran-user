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
        <div className="flex justify-center items-center gap-2 text-center">
          <img
            src={`/rank/${rankingItem?.tier}.png`}
            className="w-8"
            alt={rankingItem?.tier}
          />
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
        <span className="text-sm  whitespace-nowrap">{rankingItem.score}</span>
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
