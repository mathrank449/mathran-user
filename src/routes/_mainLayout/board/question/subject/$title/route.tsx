import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_mainLayout/board/question/subject/$title',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_mainLayout/board/question/subject/$title"!</div>
}
