import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_mainLayout/board/list/free')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_mainLayout/board/list/free"!</div>
}
