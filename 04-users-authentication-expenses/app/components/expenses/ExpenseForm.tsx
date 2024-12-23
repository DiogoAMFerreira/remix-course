import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useNavigation,
  useParams,
  useSubmit,
} from "@remix-run/react";
import ExpenseProps from "~/interfaces/ExpenseProps";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10);
  const validationErrors: Record<string, string> | undefined = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  // const expenseData: ExpenseProps | undefined = useLoaderData();
  const params = useParams();
  const matches = useMatches();

  const expenses = matches.find((match) => match.id === "routes/_app.expenses")
    ?.data as [];

  const expenseData = expenses.find(
    (expense: ExpenseProps) => expense.id === params.id
  ) as ExpenseProps | undefined;

  if (params.id && !expenseData) {
    return <p>Invalid expense id.</p>;
  }

  const defaultExpenseData: ExpenseProps = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
        id: expenseData.id,
      }
    : {
        title: "",
        amount: "",
        date: "",
        id: undefined,
      };

  // Submitting Form Programmatically
  // const submit = useSubmit();
  // function submitHandler(event) {
  //   event.preventDefault();
  //   //Front-end Validations...
  //   submit(event.target, {
  //     //action: "/expenses/add", //Can be omitted when it's the same route where it's located
  //     method: "post",
  //   });
  // }

  return (
    <Form
      method={expenseData ? "patch" : "post"}
      className="form"
      id="expense-form"
      // onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultExpenseData.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultExpenseData.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultExpenseData.date
                ? new Date(defaultExpenseData.date).toISOString().slice(0, 10)
                : ""
            }
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to={".."}>Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
