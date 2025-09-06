import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_mainLayout/board/list/all')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_mainLayout/board/list/all"!</div>
}
