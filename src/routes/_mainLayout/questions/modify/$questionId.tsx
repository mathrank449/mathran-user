import { createFileRoute } from "@tanstack/react-router";
import QuestionModifyPage from "../../../../domain/solutionBoard/questions/components/QuestionModifyPage";
import { verifyAuth } from "../../../../domain/user/utils/authGuard";

export const Route = createFileRoute(
  "/_mainLayout/questions/modify/$questionId"
)({
  beforeLoad: async () => {
    await verifyAuth({ timeoutMs: 3000 });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { questionId } = Route.useParams();
  return <QuestionModifyPage questionId={questionId} />;
}
