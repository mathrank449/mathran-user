import kakao_login from "../../../shared/assests/kakao_login.png";
import google_login from "../../../shared/assests/google_login.png";
import naver_login from "../../../shared/assests/naver_login.png";
import mathran_logo from "/mathran_logo.png";

const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
const kakao_redirect_url = import.meta.env.VITE_REDIRECT_URL_KAKAO;

const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
const naver_redirect_url = import.meta.env.VITE_REDIRECT_URL_NAVER;

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const google_redirect_url = import.meta.env.VITE_REDIRECT_URL_GOOGLE;

function LoginPage() {
  console.log(
    `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakao_redirect_url}&response_type=code&state=1234`
  );
  console.log(
    `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${naver_redirect_url}&response_type=code&state=1234`
  );
  console.log(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${google_redirect_url}&response_type=code&state=1234&access_type=offline`
  );
  return (
    <div className="flex items-center justify-center mb-36">
      <div className="rounded-xl p-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <img src={mathran_logo} />
          <h1 className="text-4xl font-bold text-gray-800">문항풀이 서비스</h1>
        </div>
        <button
          onClick={() => {
            window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${naver_redirect_url}&response_type=code&state=1234`;
          }}
        >
          <img
            src={naver_login}
            alt="네이버 로그인 버튼"
            className="w-82 cursor-pointer hover:scale-105 transition-transform"
          />
        </button>
        <button
          onClick={() => {
            window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakao_redirect_url}&response_type=code&state=1234`;
          }}
        >
          <img
            src={kakao_login}
            alt="카카오 로그인 버튼"
            className="w-82 cursor-pointer hover:scale-105 transition-transform"
          />
        </button>
        <button
          onClick={() => {
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${google_redirect_url}&response_type=code&state=1234&scope=email profile&access_type=offline`;
          }}
        >
          <img
            src={google_login}
            alt="구글 로그인 버튼"
            className="w-82 cursor-pointer hover:scale-105 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
