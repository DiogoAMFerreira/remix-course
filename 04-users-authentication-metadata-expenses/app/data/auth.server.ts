import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./database.server";
import * as bcrypt from "bcryptjs";

const SESSION_SECRET = process.env.SESSION_SECRET || "";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, //30d
    httpOnly: true,
  },
});

async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);

  return redirect(redirectPath, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

export async function requireUserSession(request: any) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    //Not logged in
    throw redirect("/auth?mode=login");
  }
  return userId;
}

export async function destroyUserSession(request: any) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function getUserFromSession(request: any) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    //User already exists
    const error = new Error(
      "A user with the provided email address already exists."
    ) as any;
    error.status = 422;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email: email, password: passwordHash },
  });

  return createUserSession(user.id, "/expenses");
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) {
    //User doesn't exists
    const error = new Error(
      "Could not log you in, please check the provided credentials"
    ) as any;
    error.status = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword) {
    //Password is wrong
    const error = new Error(
      "Could not log you in, please check the provided credentials"
    ) as any;
    error.status = 401;
    throw error;
  }

  //Create session cookie
  return createUserSession(existingUser.id, "/expenses");
}
