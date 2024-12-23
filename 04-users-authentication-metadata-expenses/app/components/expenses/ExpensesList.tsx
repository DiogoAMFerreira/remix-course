import ExpenseProps from "~/interfaces/ExpenseProps";
import ExpenseListItem from "./ExpenseListItem";

function ExpensesList({ expenses }: { expenses: ExpenseProps[] }) {
  return (
    <ol id="expenses-list">
      {expenses.map((expense: ExpenseProps) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id as string}
            title={expense.title}
            amount={+expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;
