import { ActionFunctionArgs } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css?url";

export default function AuthPage() {
  return <AuthForm></AuthForm>;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const ccredentials = Object.fromEntries(formData);
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
