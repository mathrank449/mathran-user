import { createFileRoute, useSearch } from "@tanstack/react-router";
import RedirectGooglePage from "../../domain/user/components/RedirectGooglePage";

type SearchParams = {
  code?: string;
  state?: string;
  error?: Error;
};

export const Route = createFileRoute("/redirect-google")({
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
  const { code, error } = useSearch({ from: "/redirect-google" });

  return <RedirectGooglePage code={code} error={error} />;
}
