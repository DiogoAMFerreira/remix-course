import ExpenseProps from "~/interfaces/ExpenseProps";
import ExpenseListItem from "./ExpenseListItem";

function ExpensesList({ expenses }: { expenses: ExpenseProps[] }) {
  return (
    <ol id="expenses-list">
      {expenses.map((expense: ExpenseProps) => (
        <li key={expense.id}>
          <ExpenseListItem expense={expense} />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;
