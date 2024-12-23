import { ActionFunctionArgs } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import { validateLoginInput } from "~/data/validation.server";
import authStyles from "~/styles/auth.css?url";

export default function AuthPage() {
  return <AuthForm></AuthForm>;
}

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();

  try {
    validateLoginInput({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  } catch (error) {
    return error;
  }

  if (authMode === "login") {
    // Login
  } else {
    // Signup
  }
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
