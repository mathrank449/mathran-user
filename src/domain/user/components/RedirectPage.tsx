import { useEffect } from "react";
import { login } from "../apis/auth";
import instance from "../../../shared/apis/instance";
import { useNavigate } from "@tanstack/react-router";

interface RedirectPageProps {
  code?: string;
  error?: Error;
}

function RedirectPage({ code, error }: RedirectPageProps) {
  const navigate = useNavigate();
  useEffect(() => {
    login({ provider: "KAKAO", code: code || "", state: "1234" })
      .then((userInfo) => {
        instance.defaults.headers.common[
          "Authorization"
        ] = `${userInfo.accessToken}`;
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

export default RedirectPage;
