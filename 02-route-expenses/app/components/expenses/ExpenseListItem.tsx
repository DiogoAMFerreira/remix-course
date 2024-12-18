import { Link } from "@remix-run/react";
import ExpenseProps from "~/interfaces/ExpenseProps";

function ExpenseListItem({ expense }: { expense: ExpenseProps }) {
  function deleteExpenseItemHandler() {
    // tbd
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{expense.title}</h2>
        <p className="expense-amount">${expense.amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={expense.id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
