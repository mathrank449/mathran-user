import { useEffect, useState } from "react";
import type { RankInfo } from "../types/rank";
import { getRankAll } from "../apis/rank";
import RankingHeader from "./RankingHeader";
import RankingItem from "./RankingItem";

function RankingListPage() {
  const [rankginList, setRankingList] = useState<RankInfo[] | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      const rankginListResponse = await getRankAll();
      setRankingList(rankginListResponse);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center gap-24">
      <div className="text-left pl-12 bg-gray-50 text-3xl py-6 w-full">
        랭킹
      </div>
      <RankingHeader />
      {rankginList?.map((rankingItem, index) => (
        <RankingItem rankingItem={rankingItem} index={index} />
      ))}
    </div>
  );
}

export default RankingListPage;
