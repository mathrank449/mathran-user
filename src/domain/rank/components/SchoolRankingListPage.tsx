import { useEffect, useState } from "react";
import type { SchoolRankInfoPagination } from "../types/rank";
import { getSchoolRankAll } from "../apis/rank";
import Pagination from "../../../shared/components/Pagination";
import Modal from "react-modal";
import SchoolRankingItem from "./SchoolRankingItem";
import SchoolRankingHeader from "./SchoolRankingHeader";
import { useNavigate } from "@tanstack/react-router";

Modal.setAppElement("#root"); // 접근성 설정

function SchoolRankingListPage() {
  const navigate = useNavigate();
  const [rankginListPagination, setRankginListPagination] = useState<
    SchoolRankInfoPagination | undefined
  >(undefined);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const rankginListResponse = await getSchoolRankAll(page);
      setRankginListPagination(rankginListResponse);
    };
    fetchData();
  }, [page]);

  if (rankginListPagination === undefined) return null;

  return (
    <div className="flex flex-col items-center gap-12">
      {/* 헤더 */}
      <div className="flex items-center justify-between pl-12 pr-6 bg-gray-50 text-3xl py-6 w-full">
        <span>랭킹</span>
      </div>
      {/* 탭 버튼 */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate({ to: "/rankings" })}
          className="px-4 py-2 rounded-xl text-lg font-semibold border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
        >
          학생 랭킹
        </button>
        <button
          className="px-4 py-2 rounded-xl text-lg font-semibold bg-black text-white shadow-md cursor-pointer"
          onClick={() => {
            navigate({ to: "/rankings/school" });
          }}
        >
          학교 랭킹
        </button>
      </div>

      {/* 랭킹 리스트 */}
      <div>
        <SchoolRankingHeader />
        {rankginListPagination?.queryResults?.map((rankingItem, index) => (
          <SchoolRankingItem
            key={index}
            rankingItem={rankingItem}
            index={index}
          />
        ))}
        <Pagination
          pageInfo={{
            currentPageNumber: rankginListPagination?.currentPageNumber,
            possibleNextPageNumbers:
              rankginListPagination?.possibleNextPageNumbers,
          }}
          setPage={setPage}
        />
      </div>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white rounded-2xl shadow-lg max-w-lg mx-auto mt-40 p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
      >
        <h2 className="text-2xl font-bold mb-4">랭킹 기준 안내</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          랭킹은 <b>난이도별 개별 문제 정답 수와 순위 비율</b>을 종합하여
          산출됩니다. <br />
          동일 점수일 경우, 최근 활동일을 기준으로 순위가 매겨집니다.
        </p>

        {/* 랭킹 등급 설명 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">랭킹 등급</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <img
                src={`/rank/DIAMOND_STAR_1.png`}
                className="w-8"
                alt="diamond star"
              />
              다이아 스타 (5단계)
            </li>
            <li className="flex items-center gap-2">
              <img
                src={`/rank/GOLD_STAR_1.png`}
                className="w-8"
                alt="diamond star"
              />
              골드 스타 (5단계)
            </li>
            <li className="flex items-center gap-2">
              <img
                src={`/rank/SILVER_STAR_1.png`}
                className="w-8"
                alt="diamond star"
              />
              실버 스타 (5단계)
            </li>
            <li className="flex items-center gap-2">
              <img
                src={`/rank/BRONZE_STAR_1.png`}
                className="w-8"
                alt="diamond star"
              />
              브론즈 스타 (5단계)
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 mt-4">
            <li className="flex items-center gap-2">
              <img
                src={`/rank/GOLD_MEDAL_1.png`}
                className="w-8"
                alt="diamond star"
              />
              금메달 (5단계)
            </li>
            <li className="flex items-center gap-2">
              <img
                src={`/rank/SILVER_MEDAL_1.png`}
                className="w-8"
                alt="diamond star"
              />
              은메달 (5단계)
            </li>
            <li className="flex items-center gap-2">
              <img
                src={`/rank/COPPER_MEDAL_1.png`}
                className="w-8"
                alt="diamond star"
              />
              동메달 (5단계)
            </li>
          </ul>
          <ul className="space-y-2 text-gray-700 mt-4">
            <li className="flex items-center gap-2">
              <img
                src={`/rank/NOOBIE_1.png`}
                className="w-8"
                alt="diamond star"
              />
              새싹 (5단계)
            </li>
          </ul>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default SchoolRankingListPage;
