import { createFileRoute } from "@tanstack/react-router";
import MyPage from "../../../domain/user/components/MyPage";
import { verifyAuth } from "../../../domain/user/utils/authGuard";

export const Route = createFileRoute("/_mainLayout/my/")({
  beforeLoad: async () => {
    await verifyAuth({ timeoutMs: 3000 });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <MyPage />;
}
