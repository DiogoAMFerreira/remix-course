import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "~/data/expenses.server";
import ExpenseProps from "~/interfaces/ExpenseProps";

export default function ExpensesLayout() {
  const expenses: ExpenseProps[] = useLoaderData();

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
        <ExpensesList expenses={expenses}></ExpensesList>
      </main>
    </>
  );
}

export async function loader() {
  //   const expenses = await getExpenses();
  //   return Response.json(expenses);
  // or
  //   return expenses;
  return getExpenses();
}
