import { useState } from "react";
import RegisterForm from "./RegisterForm";
import type { BasicUserInfo } from "../types/user";
import mathran_logo from "/mathran_logo.png";

function RegisterPage() {
  const [formData, setFormData] = useState<BasicUserInfo>({
    nickName: "",
    role: "USER",
    memberType: "STUDENT",
    agreeToPrivacyPolicy: false,
    schoolDetail: undefined,
  });
  return (
    <div className="mx-auto w-[720px] mb-36">
      <div className="rounded-xl p-10 flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-4">
          <img src={mathran_logo} />
          <h1 className="text-4xl font-bold text-gray-800">문항풀이 서비스</h1>
        </div>
        <RegisterForm formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}

export default RegisterPage;
