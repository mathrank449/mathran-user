import { createFileRoute } from "@tanstack/react-router";
import MySchoolProblemList from "../../../../domain/problem/problem/components/MySchoolProblemList";

export const Route = createFileRoute("/_mainLayout/problems/school")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MySchoolProblemList />;
}
