import { useEffect, useState } from "react";
import type { School } from "../../problem/types/school";
import { getMyProblemSolveInfo, getUserInfo } from "../apis/user";
import type { UserRankInfo } from "../../rank/types/rank";
import { getRankByMemberId } from "../../rank/apis/rank";
import type { ProblemSolveInfo } from "../types/user";
import PortOne from "@portone/browser-sdk/v2";
import { useAuthStore } from "../stores/authStore";

function MyPage() {
  const [mySchool, setMySchool] = useState<School | undefined>(undefined);
  const [myRank, setMyRank] = useState<UserRankInfo | undefined>();
  const [myProblemSolveInfo, setMyProblemSolveInfo] = useState<
    ProblemSolveInfo | undefined
  >(undefined);

  const { userInfo } = useAuthStore();

  const handlePaymentButton = async () => {
    const response = await PortOne.requestPayment({
      // Store ID 설정
      storeId: "store-a9019ea9-0758-4ab0-bc07-fafdfcd6986e",
      // 채널 키 설정
      channelKey: "channel-key-c62a3472-8260-449d-a8eb-deeb5733240e",
      paymentId: `payment-${crypto.randomUUID()}`,
      orderName: "나이키 와플 트레이너 2 SD",
      totalAmount: 1000,
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
    });

    if (response && response.code !== undefined) {
      // 오류 발생
      return alert(response.message);
    }

    // /payment/complete 엔드포인트를 구현해야 합니다. 다음 목차에서 설명합니다.
    // const notified = await fetch(`${SERVER_BASE_URL}/payment/complete`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   // paymentId와 주문 정보를 서버에 전달합니다
    //   body: JSON.stringify({
    //     paymentId: paymentId,
    //     // 주문 정보...
    //   }),
    // });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUserInfo = await getUserInfo();
        setMySchool(myUserInfo.schoolDetail);
        const myRankInfo = await getRankByMemberId(String(myUserInfo.memberId));
        setMyRank(myRankInfo);
        const myProblemSolveInfoResponse = await getMyProblemSolveInfo();
        setMyProblemSolveInfo(myProblemSolveInfoResponse);
      } catch (e) {
        console.log(e);

        if ((e as { code: number })?.code === 8003) {
          setMyRank({
            rank: 0,
            tier: "NONE",
            score: 0,
            totalUserCount: 0,
          });
        }
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-[1200px] mx-auto mt-24">
      {/* 헤더 */}
      <div className="border-b border-gray-300 py-4 flex justify-start items-center gap-2">
        <img
          src={`/rank/${myRank?.tier}.png`}
          className="w-8"
          alt={myRank?.tier}
        />
        <span className="text-2xl font-semibold text-gray-700">
          {userInfo?.userName}
        </span>
      </div>

      {/* 메인 레이아웃 */}
      <div className="flex justify-between gap-10 my-8">
        <div>
          {/* 왼쪽 사이드: 프로필/통계 */}
          <section className="w-[380px] space-y-4">
            <div className="rounded-2xl border border-gray-200 shadow-sm p-6 bg-white space-y-4 mb-12">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">등수</span>
                <span className="text-xl font-bold text-blue-600">
                  {myRank?.rank}
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
          <section className="text-center">
            <button
              type="button"
              aria-label="결제하기 버튼"
              className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-600 transition cursor-pointer"
              onClick={handlePaymentButton}
            >
              포인트 충전
            </button>
          </section>
        </div>

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
