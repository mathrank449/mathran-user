import { createFileRoute } from "@tanstack/react-router";
import PrivacyPage from "../../domain/privacy/components/PrivacyPage";

export const Route = createFileRoute("/privacy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PrivacyPage />;
}
