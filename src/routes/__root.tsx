import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../shared/components/Header";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen flex flex-col min-w-[1680px]">
        <Header />
        <main className="bg-white flex-1 flex items-center justify-center">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </>
  ),
});
