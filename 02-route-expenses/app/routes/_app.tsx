import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import expensesStyles from "~/styles/expenses.css?url";

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader></ExpensesHeader>
      <Outlet />
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
