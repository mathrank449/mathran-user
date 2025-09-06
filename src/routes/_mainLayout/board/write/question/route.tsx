import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_mainLayout/board/write/question")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_mainLayout/board/write/question"!</div>;
}
