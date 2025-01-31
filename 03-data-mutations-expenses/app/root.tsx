import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import sharedStyles from "~/styles/shared.css?url";
import ErrorBox from "./components/util/ErrorBox";

function Document({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return <Document>{children}</Document>;
}

export function ErrorBoundary() {
  const error: unknown = useRouteError();

  let title = "An error occurred!";
  let message = "Unknown error";
  if (isRouteErrorResponse(error)) {
    title = error.statusText;
    message =
      error.data?.message || "Something went wrong. Please try again later";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Document title={title}>
      <ErrorBox title={title}>
        <p>{message}</p>
        <p>
          Back to <Link to="/">safety</Link>.
        </p>
      </ErrorBox>
    </Document>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}

export default function App() {
  return <Outlet />;
}
