function SchoolRankingHeader() {
  return (
    <div className="w-[1650px] custom-scrollbar whitespace-nowrap bg-white py-[10px] border-solid border-[#DEDEDE] border-2">
      <div className="w-[250px] inline-block text-center">
        <span className="text-black text-xl">등수</span>
      </div>
      <div className="w-[500px] inline-block text-center">
        <span className="text-black text-xl">학교</span>
      </div>
      <div className="w-[600px] inline-block text-center">
        <span className="text-black text-xl">학생 수</span>
      </div>
      <div className="w-[300px] inline-block text-center">
        <span className="text-black text-xl">점수</span>
      </div>
    </div>
  );
}

export default SchoolRankingHeader;
