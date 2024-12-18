import { Link, Outlet } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "First expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
];

export default function ExpensesLayout() {
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
        <ExpensesList expenses={DUMMY_EXPENSES}></ExpensesList>
      </main>
    </>
  );
}
