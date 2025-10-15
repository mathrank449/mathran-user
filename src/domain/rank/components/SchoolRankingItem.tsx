import type { SchoolRankInfo } from "../types/rank";

function SchoolRankingItem({
  rankingItem,
  index,
}: {
  rankingItem: SchoolRankInfo;
  index: number;
}) {
  return (
    <div
      className={`w-[1650px] whitespace-nowrap py-3 border-solid border-[#DEDEDE] border-2 border-t-0 ${
        index % 2 === 0 ? "bg-white " : " bg-gray-100"
      }`}
    >
      <div className="inline-block align-middle w-[250px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={String(rankingItem.rank)}
        >
          {rankingItem.rank}
        </span>
      </div>
      <div className="inline-block align-middle w-[500px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={String(rankingItem.schoolName)}
        >
          {String(rankingItem.schoolName)}
        </span>
      </div>
      <div className="inline-block align-middle w-[600px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={String(rankingItem.memberCount)}
        >
          {String(rankingItem.memberCount)}
        </span>
      </div>
      <div className="inline-block align-middle w-[300px] text-center overflow-hidden truncate">
        <span
          className="text-sm text-black whitespace-nowrap"
          title={String(rankingItem.score)}
        >
          {String(rankingItem.score)}
        </span>
      </div>
    </div>
  );
}

export default SchoolRankingItem;
