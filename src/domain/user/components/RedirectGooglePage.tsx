import { useEffect } from "react";
import { login } from "../apis/auth";
import instance from "../../../shared/apis/instance";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../stores/authStore";
import { getUserInfo } from "../apis/user";

interface RedirectPageProps {
  code?: string;
  error?: Error;
}

function RedirectGooglePage({ code, error }: RedirectPageProps) {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await login({
          provider: "GOOGLE",
          code: code || "",
          state: "1234",
        });
        instance.defaults.headers.common[
          "Authorization"
        ] = `${userInfo.accessToken}`;
        const userDetailedInfo = await getUserInfo();
        setAuth(userDetailedInfo);
        if (userInfo.isNewUser) {
          alert("기본정보를 기입해주세요.");
          navigate({ to: "/register" });
          return;
        }
        alert("로그인에 성공하였습니다.");
        navigate({ to: "/" });
      } catch (e) {
        console.log(e);
        alert("로그인에 실패하였습니다.");
        navigate({ to: "/" });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {code && <p>로그인 중..</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
}

export default RedirectGooglePage;
