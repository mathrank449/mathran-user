import { createFileRoute } from "@tanstack/react-router";
import SchoolRankingListPage from "../../../../domain/rank/components/SchoolRankingListPage";

export const Route = createFileRoute("/_mainLayout/rankings/school")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SchoolRankingListPage />;
}
