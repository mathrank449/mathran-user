import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AiOutlineDown } from "react-icons/ai";
import { AxiosError } from "axios";
import { useState } from "react";
import { ProblemNav } from "./ProblemNav";
import { MoreNav } from "./MoreNav";
import instance from "../apis/instance";
import { logout } from "../../domain/user/apis/auth";
import { useAuthStore } from "../../domain/user/stores/authStore";

export function Header() {
  const navigate = useNavigate();
  const [isHoveringProblemNav, setIsHoveringProblemNav] = useState(false);
  const [isHoveringMoreNav, setIsHoveringMoreNav] = useState(false);
  const { clearAuth, userInfo, isLogin } = useAuthStore();

  const logoutMutation = useMutation({
    mutationFn: async () => {},
    onSuccess: async () => {
      clearAuth();
      instance.defaults.headers.common["Authorization"] = null;
      await logout();
      navigate({ to: "/login" }); // 로그아웃 후 이동할 경로
    },
    onError: (error) => {
      if (error instanceof AxiosError) console.log(error.message);
    },
  });
  return (
    <header className="relative min-w-[1680px] bg-white border-b-2 border-t-[1.4px] border-[#D6D6D6] border-solid flex justify-center items-center pt-2 px-6 z-10">
      <nav className="flex items-center justify-center gap-16 pt-4">
        <button
          className="cursor-pointer"
          onClick={() => {
            navigate({ to: "/" });
          }}
        >
          <img src="/mathran_logo.png" className="absolute w-20 left-4 top-1" />
        </button>
        <div
          className="py-4"
          onMouseEnter={() => setIsHoveringProblemNav(true)}
          onMouseLeave={() => setIsHoveringProblemNav(false)}
        >
          <span className="text-lg">문제</span>
          <AiOutlineDown className="inline-block ml-2 mb-1" />
          {/* 드롭다운 메뉴 */}
          <ProblemNav isVisible={isHoveringProblemNav} />
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
          경시대회
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
          className="text-lg cursor-pointer py-4"
          onClick={() => {
            navigate({ to: "/solution-board/list/all" });
          }}
        >
          게시판
        </button>
        <button
          className="text-lg cursor-pointer py-4"
          onClick={() => {
            navigate({ to: "/resource" });
          }}
        >
          자료실
        </button>
        <div
          className="relative py-4"
          onMouseEnter={() => setIsHoveringMoreNav(true)}
          onMouseLeave={() => setIsHoveringMoreNav(false)}
        >
          <span className="text-lg">더보기</span>
          <AiOutlineDown className="inline-block ml-2 mb-1" />
          {/* 드롭다운 메뉴 */}
          <MoreNav isVisible={isHoveringMoreNav} />
        </div>
        <div className="absolute right-4">
          {/* 오른쪽 로그인/로그아웃 */}
          {isLogin ? (
            <div className="flex items-center gap-4 mr-8">
              {/* ✅ 포인트 표시 */}
              <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-md">
                <img src="/point.png" alt="포인트" className="w-4 h-4" />
                <span className="text-sm font-medium text-amber-700">
                  {2000}P
                </span>
              </div>
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate({ to: "/my" });
                }}
              >
                <span className="text-sm text-black-700 font-medium">
                  {userInfo?.userName}
                </span>
              </button>
              <span className="text-gray-400">|</span>
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate({ to: "/setting" });
                }}
              >
                <span className="text-sm text-black-700 font-medium">설정</span>
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => {
                  logoutMutation.mutate();
                }}
                className="cursor-pointer text-white bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-md text-sm transition-colors duration-200"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 mr-8">
              <button
                onClick={() => {
                  navigate({ to: "/login" });
                }}
                className="cursor-pointer text-white bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded-md text-sm transition-colors duration-200"
              >
                로그인
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
