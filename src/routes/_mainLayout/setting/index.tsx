import { createFileRoute } from "@tanstack/react-router";
import SettingPage from "../../../domain/user/components/SettingPage";

export const Route = createFileRoute("/_mainLayout/setting/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingPage />;
}
