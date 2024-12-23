import { ActionFunctionArgs, redirect } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import { login, signup } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import authStyles from "~/styles/auth.css?url";

export default function AuthPage() {
  return <AuthForm></AuthForm>;
}

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login(credentials);
    } else {
      // Signup
      return await signup(credentials);
    }
  } catch (error: any) {
    if (error.status === 422 || error.status === 401) {
      return { credentials: error.message };
    }
  }
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
