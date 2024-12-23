import { ActionFunctionArgs } from "@remix-run/node";
import { destroyUserSession } from "~/data/auth.server";

export function action({ request }: ActionFunctionArgs) {
  if (request.method !== "DELETE") {
    throw Response.json({ message: "Invalid request method" }, { status: 400 });
  }

  return destroyUserSession(request);
}
