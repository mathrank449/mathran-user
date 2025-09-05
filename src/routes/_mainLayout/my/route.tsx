import { createFileRoute } from "@tanstack/react-router";
import MyPage from "../../../domain/user/components/MyPage";

export const Route = createFileRoute("/_mainLayout/my")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MyPage />;
}
