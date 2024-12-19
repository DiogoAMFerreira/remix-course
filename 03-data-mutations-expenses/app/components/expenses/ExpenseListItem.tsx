import { Form, Link, useFetcher, useSubmit } from "@remix-run/react";
import ExpenseProps from "~/interfaces/ExpenseProps";

function ExpenseListItem({
  id,
  title,
  amount,
}: {
  id: string;
  title: string;
  amount: number;
}) {
  //   const submit = useSubmit();
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    const confirmed = confirm(`Are you sure? Do you want to delete ${title}?`);

    if (!confirmed) {
      return;
    }
    //Submit has navigation triggered which tries to use a GET to the action URL
    // submit(null, { method: "DELETE", action: `/expenses/${id}` });
    //Fetcher doesn't have this navigation so it works cleaner for this situation
    fetcher.submit(null, { method: "DELETE", action: `/expenses/${id}` });
  }

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
