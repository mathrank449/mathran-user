import { createFileRoute } from "@tanstack/react-router";
import SettingPage from "../../../domain/user/components/SettingPage";
import { verifyAuth } from "../../../domain/user/utils/authGuard";

export const Route = createFileRoute("/_mainLayout/setting/")({
  beforeLoad: async () => {
    await verifyAuth({ timeoutMs: 3000 });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingPage />;
}
