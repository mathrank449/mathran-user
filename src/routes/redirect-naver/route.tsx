import { createFileRoute, useSearch } from "@tanstack/react-router";
import RedirectNaverPage from "../../domain/user/components/RedirectNaverPage";

type SearchParams = {
  code?: string;
  state?: string;
  error?: Error;
};

export const Route = createFileRoute("/redirect-naver")({
  component: RouteComponent,
  validateSearch: (search): SearchParams => {
    return {
      code: search.code as string,
      state: search.state as string,
      error: search.error as Error,
    };
  },
});

function RouteComponent() {
  const { code, error } = useSearch({ from: "/redirect-naver" });

  return <RedirectNaverPage code={code} error={error} />;
}
