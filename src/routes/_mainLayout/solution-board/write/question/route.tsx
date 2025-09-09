import { createFileRoute } from "@tanstack/react-router";
import WritingQuestionPage from "../../../../../domain/solutionBoard/components/WritingQuestionPage";

export const Route = createFileRoute(
  "/_mainLayout/solution-board/write/question"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <WritingQuestionPage />;
}
