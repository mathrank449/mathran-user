import { CategoryColumn } from "./CategoryColumn";

type MoreNavProps = {
  isVisible: boolean;
};

export function MoreNav({ isVisible }: MoreNavProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 w-64">
      <div className="bg-white shadow-lg z-10 border-t-2 border-blue-500 pt-4 pb-12">
        {/* 일반 문제 */}
        <CategoryColumn title="문제" items={["개인 정보 처리 방침"]} />
      </div>
    </div>
  );
}
