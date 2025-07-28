import { useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  console.error(error);

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Error</h1>
        <p className="text-center text-lg">
          There was an error. Please try again later.
        </p>
        <p className="text-center">
          If the error persists, please contact support.{" "}
        </p>
        <a className="mx-auto text-blue-500 underline" href="mailto:support">
          support
        </a>
        <p className="text-center">{errorMessage}</p>
      </div>
    </div>
  );
}
