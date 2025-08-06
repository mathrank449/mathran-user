import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

export function Header() {
  const navigate = useNavigate();
  const [isHoveringProblemNav, setIsHoveringProblemNav] = useState(true);
  return (
    <header className="relative px-6 bg-white text-[#8E8E8E] border-t-[0px] border-b-[1px] border-[#8E8E8E]">
      <img src="/mathran_logo.png" className="absolute w-20 left-4 top-1" />
      <nav className="flex items-center justify-center gap-16 pt-4">
        <div
          className="py-4 cursor-pointer"
          onMouseEnter={() => setIsHoveringProblemNav(true)}
          onMouseLeave={() => setIsHoveringProblemNav(true)}
        >
          <span className="text-lg">문제</span>
          <AiOutlineDown className="inline-block ml-2 mb-1" />
          {/* 드롭다운 메뉴 */}
          {isHoveringProblemNav && (
            <div className="absolute top-full left-0 w-full px-6">
              <div className="flex justify-center gap-36 bg-white shadow-lg z-10 border-t-2 border-blue-500 pb-12 pt-4">
                <div className="flex flex-col items-start justify-center gap-6">
                  <h2 className="text-2xl">문제</h2>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>전체 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>최신 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>인기 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>우리 학교 예상 문제</span>
                  </button>
                </div>

                <div className="flex flex-col items-start justify-center gap-6">
                  <h2 className="text-2xl">문제</h2>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>전체 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>최신 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>인기 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>우리 학교 예상 문제</span>
                  </button>
                </div>

                <div className="flex flex-col items-start justify-center gap-6">
                  <h2 className="text-2xl">문제</h2>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>전체 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>최신 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>인기 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>우리 학교 예상 문제</span>
                  </button>
                </div>

                <div className="flex flex-col items-start justify-center gap-6">
                  <h2 className="text-2xl">문제</h2>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>전체 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>최신 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>인기 문제</span>
                  </button>
                  <button className="inline-block">
                    <AiOutlineRight className="inline-block" />
                    <span>우리 학교 예상 문제</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          className="text-lg cursor-pointer py-4"
          onClick={() => {
            navigate({ to: "/test-papers" });
          }}
        >
          시험지
        </button>
        <button
          className="text-lg cursor-pointer  py-4"
          onClick={() => {
            navigate({ to: "/contests" });
          }}
        >
          대회
        </button>
        <button
          className="text-lg cursor-pointer  py-4"
          onClick={() => {
            navigate({ to: "/rankings" });
          }}
        >
          랭킹
        </button>
        <button
          className="text-lg cursor-pointer  py-4"
          onClick={() => {
            navigate({ to: "/forum" });
          }}
        >
          게시판
        </button>
        <button
          className="text-lg cursor-pointer  py-4"
          onClick={() => {
            navigate({ to: "/resources" });
          }}
        >
          자료실
        </button>
        <button
          className="text-lg cursor-pointer  py-4"
          onClick={() => {
            navigate({ to: "/more" });
          }}
        >
          더보기
        </button>
      </nav>
    </header>
  );
}
// 5%
