import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_mainLayout/board/question/problem/$projectId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_mainLayout/board/question/problem/$projectId"!</div>
}
