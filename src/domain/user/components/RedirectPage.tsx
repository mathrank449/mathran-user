import { useEffect } from "react";
import { login } from "../apis/auth";

interface RedirectPageProps {
  code?: string;
  error?: Error;
}

function RedirectPage({ code, error }: RedirectPageProps) {
  useEffect(() => {
    login({ provider: "KAKAO", code: code || "", state: "1234" })
      .then((response) => {
        console.log("Login success:", response);
      })
      .catch((e) => {
        console.error("Login failed:", e);
      });
  }, []);

  return (
    <div>
      <h1>RedirectPage</h1>
      {code && <p>Code: {code}</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
}

export default RedirectPage;
