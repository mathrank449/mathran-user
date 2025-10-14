import { createFileRoute } from "@tanstack/react-router";
import PurchaseHistoryPage from "../../../../domain/user/components/PurchaseHistoryPage";

export const Route = createFileRoute("/_mainLayout/my/purchase")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PurchaseHistoryPage />;
}
