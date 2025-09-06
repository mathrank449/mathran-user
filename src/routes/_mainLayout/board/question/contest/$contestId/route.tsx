import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_mainLayout/board/question/contest/$contestId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_mainLayout/board/question/contest/$contestId"!</div>
}
