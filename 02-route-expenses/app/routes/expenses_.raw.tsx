const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "First expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
];

export function loader() {
  return DUMMY_EXPENSES;
}
