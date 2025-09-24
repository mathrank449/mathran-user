import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { refreshToken } from "../domain/user/apis/auth";
import instance from "../shared/apis/instance";
import { useAuthStore } from "../domain/user/stores/authStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 실패 시 3번 재시도 (기본값)
    },
  },
});

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { isLogin, setAuth, clearAuth } = useAuthStore.getState();
    if (isLogin !== null) return;

    try {
      const userInfo = await refreshToken();
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userInfo.accessToken}`;
      setAuth(userInfo);
    } catch (error) {
      clearAuth();
    }
  },
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col min-w-[1680px]">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </QueryClientProvider>
  ),
});
