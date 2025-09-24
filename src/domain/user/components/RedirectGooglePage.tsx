import { useEffect } from "react";
import { login } from "../apis/auth";
import instance from "../../../shared/apis/instance";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../stores/authStore";

interface RedirectPageProps {
  code?: string;
  error?: Error;
}

function RedirectGooglePage({ code, error }: RedirectPageProps) {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  useEffect(() => {
    login({ provider: "NAVER", code: code || "", state: "1234" })
      .then((userInfo) => {
        instance.defaults.headers.common[
          "Authorization"
        ] = `${userInfo.accessToken}`;
        setAuth(userInfo);
        if (userInfo.isNewUser) {
          alert("기본정보를 기입해주세요.");
          navigate({ to: "/register" });
          return;
        }

        localStorage.setItem("mathran_username", userInfo.userName);
        alert("로그인에 성공하였습니다.");
        navigate({ to: "/" });
      })
      .catch((e) => {
        console.error("Login failed:", e);
      });
  }, []);

  return (
    <div>
      {code && <p>로그인 중..</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
}

export default RedirectGooglePage;
