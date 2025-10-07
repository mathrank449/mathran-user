import { useNavigate } from "@tanstack/react-router";
import { deleteMemberAccount, getUserInfo } from "../apis/user";
import { useAuthStore } from "../stores/authStore";

function SettingNav() {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="w-[300px] space-y-10 absolute left-24">
      {/* 정보 수정 칸 */}

      {/* 탈퇴하기 칸 */}
      <button
        className="w-full px-4 py-3 text-left text-red-600 border border-gray-200 rounded-xl hover:bg-red-50 transition shadow-sm cursor-pointer"
        onClick={async () => {
          try {
            const userInfo = await getUserInfo();
            await deleteMemberAccount(userInfo.memberId);
            clearAuth();
            alert("계정 탈퇴에 성공하였습니다");
            navigate({ to: "/" });
          } catch (e) {
            console.log(e);
            alert("계정 탈퇴에 실패하였습니다");
          }
        }}
      >
        탈퇴하기
      </button>
    </div>
  );
}

export default SettingNav;
