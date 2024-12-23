import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
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
