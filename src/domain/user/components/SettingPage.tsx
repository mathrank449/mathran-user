import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getSchoolList } from "../school/api/schoo";
import SettingNav from "./SettingNav";
import { getUserInfo, modifyUserInfo } from "../apis/user";
import type { UserDetailedInfo } from "../types/user";

function SettingPage() {
  const [searchedSchoolname, setSearchedSchoolname] = useState<string>("");

  const [userDetailedInfo, setUserDetailedInfo] = useState<
    UserDetailedInfo | undefined
  >(undefined);
  const [searchedSchooLlist, setSearchedSchooLlist] = useState<
    {
      schoolName: string;
      schoolCode: string;
      schoolKind: string;
      schoolLocation: string;
    }[]
  >([]);

  const { data: schoolList } = useQuery({
    queryKey: [`v1/schools`, searchedSchoolname],
    queryFn: ({ queryKey }) => getSchoolList(queryKey[1]),
  });

  useEffect(() => {
    if (schoolList) {
      setSearchedSchooLlist(schoolList);
    }
  }, [schoolList]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserDetailedInfo(data);
      } catch (e) {
        console.error("유저 정보를 가져오는 중 에러 발생:", e);
      }
    };

    fetchUserInfo();
  }, []);

  if (userDetailedInfo === undefined) return;

  return (
    <div className="mt-12 relative">
      <SettingNav />
      <div className="mx-auto w-[800px] mt-12 p-6 bg-white rounded-2xl ">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">정보 수정</h1>
          <hr className="border-gray-300 mb-6" />
        </div>

        {/* 이메일 표시 */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">이메일</span>
          <span className="text-gray-800 font-semibold w-1/2">sdd32dsad</span>
        </div>

        {/* 닉네임 입력 */}
        <div className="flex justify-between items-center mb-12">
          <label className="text-gray-500 font-medium" htmlFor="nickname">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={userDetailedInfo?.nickName}
            onChange={(e) => {
              setUserDetailedInfo(
                (prev) =>
                  ({
                    ...prev,
                    nickName: e.target.value,
                  } as UserDetailedInfo)
              );
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
        </div>

        {/* 가입 날짜 / 회원 타입 (읽기 전용) */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">가입 날짜</span>
          <span className="text-gray-700 w-1/2">
            {userDetailedInfo?.createdAt
              ? new Date(
                  new Date(userDetailedInfo.createdAt).getTime() +
                    9 * 60 * 60 * 1000
                ) // 9시간 더하기
                  .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\s/g, "")
              : "-"}
          </span>
        </div>
        <div className="flex justify-between items-center mb-12">
          <span className="text-gray-500 font-medium">회원 타입</span>
          <select
            className="text-gray-700 w-1/2 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={userDetailedInfo?.memberType ?? ""}
            onChange={(e) =>
              setUserDetailedInfo(
                (prev) =>
                  ({
                    ...prev,
                    memberType: e.target
                      .value as UserDetailedInfo["memberType"],
                  } as UserDetailedInfo)
              )
            }
          >
            <option value="" disabled>
              선택하세요
            </option>
            <option value="TEACHER">선생님</option>
            <option value="STUDENT">학생</option>
            <option value="NORMAL">일반인/n수생</option>
          </select>
        </div>

        {userDetailedInfo?.memberType === "STUDENT" && (
          <div className="mb-12">
            <label className="block text-xl font-semibold mb-3">학교</label>
            <div className="flex gap-8">
              <div>
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="학교명 입력"
                    onChange={(e) => setSearchedSchoolname(e.target.value)}
                    className="w-full border px-3 py-2 rounded text-sm pr-10 text-black"
                  />
                  <AiOutlineSearch className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  readOnly
                  value={userDetailedInfo.schoolDetail?.schoolName}
                  className="w-full border px-3 py-2 rounded bg-white text-sm "
                />
              </div>
              <div className="w-full h-[85px] text-sm text-gray-800 flex flex-wrap gap-2 overflow-auto border-solid border-[#D2D2D2] border-2 p-3 rounded-lg">
                {searchedSchooLlist.map((school, i) => (
                  <label key={i} className="flex items-center gap-2">
                    {school.schoolName}({school.schoolLocation})
                    <input
                      type="radio"
                      name="school"
                      value={userDetailedInfo.schoolDetail?.schoolName}
                      onChange={() => {
                        setUserDetailedInfo(
                          (prev) =>
                            ({
                              ...prev,
                              schoolDetail: school,
                            } as UserDetailedInfo)
                        );
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* 학교 선택 */}

        {/* 체크박스 + 수정 버튼 */}
        <div className="flex items-center justify-between mt-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              checked={userDetailedInfo?.agreeToPrivacyPolicy ?? false}
              onChange={(e) => {
                setUserDetailedInfo(
                  (prev) =>
                    ({
                      ...prev,
                      agreeToPrivacyPolicy: e.target.checked,
                    } as UserDetailedInfo)
                );
              }}
            />
            <span className="text-gray-700 text-sm">
              광고성 이메일 수신을 동의하시겠습니까?
            </span>
          </label>

          <button
            className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={async () => {
              try {
                if (userDetailedInfo.memberType !== "STUDENT") {
                  userDetailedInfo.schoolDetail = undefined;
                }
                await modifyUserInfo(userDetailedInfo);
                alert("기본 정보 수정을 완료하였습니다.");
              } catch (e) {
                console.log(e);
                alert("사용자 정보 수정에 실패하였습니다.");
              }
            }}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
