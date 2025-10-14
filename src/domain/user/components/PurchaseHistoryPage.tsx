import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useState } from "react";
import { getUserInfo } from "../apis/user";
import type { UserRankInfo } from "../../rank/types/rank";
import { getRankByMemberId } from "../../rank/apis/rank";
import Pagination from "../../../shared/components/Pagination";

// 🧾 구매 내역 타입 정의
type PurchaseHistory = {
  id: number;
  amount: number;
  date: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  method: "KAKAO_PAY" | "CARD" | "POINT";
  resourceName: string; // 자료 이름
  resourceId: number; // 자료 상세 페이지 이동용
};

// 예시용 더미 데이터
const dummyPurchases: PurchaseHistory[] = [
  {
    id: 1,
    amount: 5000,
    date: "2025-10-10 14:32",
    status: "SUCCESS",
    method: "KAKAO_PAY",
    resourceName: "2025 수능 대비 모의고사 A형",
    resourceId: 101,
  },
  {
    id: 2,
    amount: 10000,
    date: "2025-09-28 19:22",
    status: "SUCCESS",
    method: "CARD",
    resourceName: "고등 수학 II 개념 문제집",
    resourceId: 205,
  },
  {
    id: 3,
    amount: 5000,
    date: "2025-09-15 09:10",
    status: "FAILED",
    method: "KAKAO_PAY",
    resourceName: "중학 수학 실전 테스트 3회차",
    resourceId: 99,
  },
];

function PurchaseHistoryPage() {
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();
  const [myRank, setMyRank] = useState<UserRankInfo | undefined>();
  const [purchases, setPurchases] = useState<PurchaseHistory[]>([]);
  const [, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myUserInfo = await getUserInfo();
        const myRankInfo = await getRankByMemberId(String(myUserInfo.memberId));
        setMyRank(myRankInfo);

        // 🧾 실제 API 연결 시 아래 부분을 수정
        // const purchaseData = await getPurchaseHistory(myUserInfo.memberId);
        // setPurchases(purchaseData);
        setPurchases(dummyPurchases);
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
      <div className="border-b border-gray-300 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {myRank?.tier && (
            <img
              src={`/rank/${myRank.tier}.png`}
              alt={myRank.tier}
              className="w-8 h-8"
            />
          )}
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {userInfo?.userName}
            </p>
          </div>
        </div>

        <button
          className="px-4 py-2 bg-gray-700 text-white text-sm rounded-md hover:bg-gray-600 transition cursor-pointer"
          onClick={() => navigate({ to: "/my" })}
        >
          마이페이지로 돌아가기
        </button>
      </div>

      {/* 구매 내역 섹션 */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">구매 이력</h2>

        {purchases.length === 0 ? (
          <div className="text-gray-500 text-center py-8 border rounded-lg">
            구매 내역이 없습니다.
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    구매 ID
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    결제 금액
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    구매한 자료
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    구매 일시
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-gray-700">{item.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.amount.toLocaleString()}원
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          navigate({ to: `/resource/${item.resourceId}` })
                        }
                        className="text-blue-600 hover:underline hover:text-blue-800 cursor-pointer"
                      >
                        {item.resourceName}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <Pagination
        pageInfo={{
          currentPageNumber: 1,
          possibleNextPageNumbers: [2, 3, 4],
        }}
        setPage={setPage}
      />
    </div>
  );
}

export default PurchaseHistoryPage;
