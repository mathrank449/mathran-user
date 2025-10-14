import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../shared/components/Header";
import Footer from "../shared/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const features = [
    {
      title: "다양한 문제 & 문제집",
      description: "수학 문제와 문제집을 풀며 실력을 쌓을 수 있습니다.",
    },
    {
      title: "대회 & 랭킹",
      description: "대회 참여 후 나의 랭킹을 확인하고 경쟁할 수 있습니다.",
    },
    {
      title: "게시판 & 질문",
      description: "궁금한 점을 질문하고 다른 사용자와 소통할 수 있습니다.",
    },
    {
      title: "자료실 & 다운로드",
      description:
        "질 좋은 문제들을 찾아보고 자료실에서 다운로드할 수 있습니다.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-rbBg">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-12 mb-[120px]">
        <img
          src="/mathran_logo.png"
          className="w-48 md:w-64 lg:w-72 mb-6 mx-auto"
        />
        <h1 className="text-4xl font-bold mb-8">
          Mathran에 오신 것을 환영합니다!
        </h1>
        <p className="text-center mb-12 text-lg max-w-2xl">
          다양한 수학 문제와 문제집, 대회 참여, 나의 랭킹 확인, 질 좋은 자료
          다운로드까지 모두 가능합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
