import { useEffect, useState } from "react";
import type { School } from "../../problem/types/school";
import { getMyProblemSolveInfo, getUserInfo } from "../apis/user";
import type { UserRankInfo } from "../../rank/types/rank";
import { getRankByMemberId } from "../../rank/apis/rank";
import type { ProblemSolveInfo } from "../types/user";

function MyPage() {
  const [mySchool, setMySchool] = useState<School | undefined>(undefined);
  const [myRank, setMyRank] = useState<UserRankInfo | undefined>();
  const [myProblemSolveInfo, setMyProblemSolveInfo] = useState<
    ProblemSolveInfo | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const myUserInfo = await getUserInfo();
      setMySchool(myUserInfo.schoolDetail);
      const myRankInfo = await getRankByMemberId(String(myUserInfo.memberId));
      setMyRank(myRankInfo);
      const myProblemSolveInfoResponse = await getMyProblemSolveInfo();
      setMyProblemSolveInfo(myProblemSolveInfoResponse);
    };

    fetchData();
  }, []);
  return (
    <div className="w-[1200px] mx-auto mt-24">
      {/* 헤더 */}
      <div className="border-b border-gray-300 py-4">
        <span className="text-2xl font-semibold text-gray-700">
          ({myRank?.tier}) {localStorage.getItem("mathran_username")}
        </span>
      </div>

      {/* 메인 레이아웃 */}
      <div className="flex justify-between gap-10 my-8">
        {/* 왼쪽 사이드: 프로필/통계 */}
        <section className="w-[380px] space-y-4">
          <div className="rounded-2xl border border-gray-200 shadow-sm p-6 bg-white space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">등수</span>
              <span className="text-xl font-bold text-blue-600">
                {myRank?.rank}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">맞은 문제</span>
              <span className="text-lg font-semibold text-green-600">
                {myProblemSolveInfo?.solvedSingleProblemIds.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">틀린 문제</span>
              <span className="text-lg font-semibold text-red-600">
                {myProblemSolveInfo?.failedSingleProblemIds.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">학교/소속</span>
              {mySchool && (
                <span className="text-base text-gray-700">
                  {mySchool.schoolName}
                </span>
              )}
              {!mySchool && (
                <span className="text-base text-gray-700">소속 없음</span>
              )}
            </div>
          </div>
        </section>

        {/* 오른쪽: 문제 리스트 */}
        <section className="w-[780px] space-y-6">
          {/* 맞은 문제 */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-6 bg-white max-h-[200px] overflow-y-auto">
            <span className="block text-lg font-semibold text-gray-700 mb-3">
              맞은 문제
            </span>
            <div className="flex flex-wrap gap-3">
              {myProblemSolveInfo?.solvedSingleProblemIds.map((problemId) => (
                <a
                  href={`/problems/${problemId}`}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                >
                  {problemId}
                </a>
              ))}
              {/* 문제 항목이 많아도 스크롤 가능 */}
            </div>
          </div>

          {/* 틀린 문제 */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-6 bg-white max-h-[200px] overflow-y-auto">
            <span className="block text-lg font-semibold text-gray-700 mb-3">
              틀린 문제
            </span>
            <div className="flex flex-wrap gap-3">
              {myProblemSolveInfo?.failedSingleProblemIds.map((problemId) => (
                <a
                  href={`/problems/${problemId}`}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                >
                  {problemId}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyPage;
