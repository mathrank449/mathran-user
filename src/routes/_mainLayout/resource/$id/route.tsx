import { createFileRoute } from "@tanstack/react-router";
import ResourceDetailPage from "../../../../domain/resource/components/ResourceDetailPage";

export const Route = createFileRoute("/_mainLayout/resource/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  console.log(id);
  return <ResourceDetailPage id={id} />;
}
