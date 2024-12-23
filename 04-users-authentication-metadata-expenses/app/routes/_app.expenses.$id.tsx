import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, redirect, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
import ExpenseProps from "~/interfaces/ExpenseProps";
// import { getExpense } from "~/data/expenses.server";

export default function ExpenseDetailsPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// export async function loader({ params }: LoaderFunctionArgs) {
//   console.log("EXPENSE_ID_LOADER");
//   const expenseId = params.id as string;
//   const expense = await getExpense(expenseId);
//   return expense;
// }

export async function action({ params, request }: ActionFunctionArgs) {
  const expenseId = params.id as string;

  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData: ExpenseProps = {
      id: expenseId,
      title: formData.get("title") as string,
      amount: formData.get("amount") as string,
      date: formData.get("date") as string,
    };

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);

    return redirect("..");
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);

    return redirect("..");
  }
}

export const meta: MetaFunction = ({ params, location, data, matches }) => {
  const expenses: ExpenseProps[] = matches.find(
    (match) => match.id === "routes/_app.expenses"
  )?.data as [];

  const expense = expenses.find(
    (expense: ExpenseProps) => expense.id === params.id
  );

  return [
    {
      title: expense?.title,
    },
    {
      description: "Update expense.",
    },
  ];
};
