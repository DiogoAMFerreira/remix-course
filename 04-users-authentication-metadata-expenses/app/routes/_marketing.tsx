import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";

import marketingStyles from "~/styles/marketing.css?url";

export default function MarketingLayout() {
  return (
    <>
      <MainHeader></MainHeader>
      <Outlet />
    </>
  );
}

export function loader({ request }: LoaderFunctionArgs) {
  return getUserFromSession(request);
}

export function links() {
  return [{ rel: "stylesheet", href: marketingStyles }];
}

export function meta() {
  return [
    {
      title: "Remix Expenses - The Complete App",
    },
    {
      description: "Manage your expenses with ease",
    },
  ];
}

export function headers() {
  return {
    "Cache-Control": "max-age=3600", //60 minutes
  };
}
