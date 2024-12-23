import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "~/data/expenses.server";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import ExpenseProps from "~/interfaces/ExpenseProps";
import ErrorBox from "~/components/util/ErrorBox";
import { requireUserSession } from "~/data/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export default function ExpensesAnalysisPage() {
  const expenses: ExpenseProps[] = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses}></Chart>
      <ExpenseStatistics expenses={expenses}></ExpenseStatistics>
    </main>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw Response.json(
      { message: "Could not load any expenses" },
      { status: 404, statusText: "Expenses not found" }
    );
  }
  return expenses;
}

export function ErrorBoundary() {
  const error = useRouteError();

  let title = "Error!";
  let message = "Something went wrong - could not load expenses.";

  if (isRouteErrorResponse(error)) {
    title = error.statusText ?? title;
    message = error.data?.message ?? message;
  }

  return (
    <main>
      <ErrorBox title={title}>
        <p>{message}</p>
      </ErrorBox>
    </main>
  );
}
