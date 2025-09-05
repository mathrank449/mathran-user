function SettingNav() {
  return (
    <div className="w-[300px] space-y-10 absolute left-24">
      {/* 정보 수정 칸 */}

      {/* 탈퇴하기 칸 */}
      <button className="w-full px-4 py-3 text-left text-red-600 border border-gray-200 rounded-xl hover:bg-red-50 transition shadow-sm cursor-pointer">
        탈퇴하기
      </button>
    </div>
  );
}

export default SettingNav;
