// LoginPage.tsx
import { useMutation, useQuery } from "@tanstack/react-query";
import InputBox from "../../../shared/components/InputBox";
import { AiOutlineSearch } from "react-icons/ai";
import { register } from "../apis/auth";
import type { BasicUserInfo } from "../types/user";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getSchoolList } from "../school/api/schoo";

interface RegisterFormProps {
  formData: BasicUserInfo;
  setFormData: React.Dispatch<React.SetStateAction<BasicUserInfo>>;
}

const RegisterForm = ({ formData, setFormData }: RegisterFormProps) => {
  const navigate = useNavigate();

  const [searchedSchoolname, setSearchedSchoolname] = useState<string>("");
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

  const registerMutation = useMutation({
    mutationFn: (formData: BasicUserInfo) => register(formData),
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate({ to: "/login" });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert("회원가입에 실패하였습니다.");
        navigate({ to: "/login" });
      }
    },
  });

  console.log(formData);
  return (
    <form className="mx-auto w-[520px] rounded-2xl space-y-4">
      <div className="mb-12">
        <label
          className="block mb-1 text-lg font-semibold text-gray-700"
          htmlFor="username"
        >
          닉네임
        </label>
        <InputBox
          type="text"
          id="nickname"
          value={formData.nickName}
          name="nickname"
          handleChange={(e) => {
            setFormData(
              (prev) =>
                ({
                  ...prev,
                  nickName: e.target.value,
                } as BasicUserInfo)
            );
          }}
        />
      </div>
      {/* 소속 입력 */}
      <div className="mb-12">
        <label className="block text-lg mb-3 font-semibold text-gray-700">
          소속
        </label>
        <div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="memberType"
                value="STUDENT"
                checked={formData.memberType === "STUDENT"}
                onChange={(e) =>
                  setFormData(
                    (prev) =>
                      ({
                        ...prev,
                        memberType: e.target.value,
                      } as BasicUserInfo)
                  )
                }
              />
              학생
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="memberType"
                value="TEACHER"
                checked={formData.memberType === "TEACHER"}
                onChange={(e) =>
                  setFormData(
                    (prev) =>
                      ({
                        ...prev,
                        memberType: e.target.value,
                        schoolDetail: undefined,
                      } as BasicUserInfo)
                  )
                }
              />
              선생님
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="memberType"
                value="NORMAL"
                checked={formData.memberType === "NORMAL"}
                onChange={(e) =>
                  setFormData(
                    (prev) =>
                      ({
                        ...prev,
                        memberType: e.target.value,
                        schoolDetail: undefined,
                      } as BasicUserInfo)
                  )
                }
              />
              N수생 / 일반인
            </label>
          </div>
        </div>
      </div>
      {formData.memberType === "STUDENT" && (
        <div className="mb-12">
          <label className="block text-lg mb-3 font-semibold text-gray-700">
            학교
          </label>
          <div className="flex gap-8 ">
            <div>
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="학교명 입력"
                  onChange={(e) => {
                    setSearchedSchoolname(e.target.value);
                  }}
                  className="w-full border px-3 py-2 rounded text-sm pr-10 text-black"
                />
                <AiOutlineSearch className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                readOnly
                value={formData.schoolDetail?.schoolName ?? ""}
                className="w-full border px-3 py-2 rounded bg-white text-sm"
              />
            </div>
            {/* 체크박스 학교 리스트 */}
            <div className="w-full h-[85px] text-sm text-gray-800 flex flex-wrap gap-2 overflow-auto border-solid border-[#D2D2D2] border-2 p-3 rounded-lg">
              {searchedSchooLlist.map((school, i) => (
                <label key={i} className="flex items-center gap-2">
                  {school.schoolName}({school.schoolLocation})
                  <input
                    type="radio"
                    name="school"
                    value={school.schoolName}
                    onChange={() => {
                      // 학교, 지역 선택
                      setFormData((prev) => ({
                        ...prev,
                        schoolDetail: school,
                      }));
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <label className="flex items-center gap-2 mb-16">
        <input
          type="checkbox"
          className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
          checked={formData.agreeToPrivacyPolicy ?? false}
          onChange={(e) => {
            setFormData(
              (prev) =>
                ({
                  ...prev,
                  agreeToPrivacyPolicy: e.target.checked,
                } as BasicUserInfo)
            );
          }}
        />
        <span className="text-gray-700 text-sm">
          광고성 이메일 수신을 동의하시겠습니까?
        </span>
      </label>

      <div className="text-right">
        <button
          type="button"
          onClick={() => {
            registerMutation.mutate(formData);
          }}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition cursor-pointer"
        >
          회원가입
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
