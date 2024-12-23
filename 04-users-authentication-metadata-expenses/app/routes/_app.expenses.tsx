import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";
import ExpenseProps from "~/interfaces/ExpenseProps";

export default function ExpensesLayout() {
  const expenses: ExpenseProps[] = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet></Outlet>
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus></FaPlus>
            <span>Add Expense</span>
          </Link>
          {/* Anchor since it's not a page */}
          <a href="/expenses/raw">
            <FaDownload></FaDownload>
            <span>Download</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses}></ExpensesList>}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found!</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  //   if (!expenses || expenses.length === 0) {
  //     throw Response.json(
  //       { message: "Could not find any expenses." },
  //       { status: 404, statusText: "No expenses found" }
  //    );
  //   }

  return expenses;
}

// export function ErrorBoundary() {
//   const error = useRouteError();
//   if (isRouteErrorResponse(error)) {
//     return <p>Error</p>;
//   }
// }
