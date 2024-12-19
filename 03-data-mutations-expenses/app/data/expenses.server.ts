import ExpenseProps from "~/interfaces/ExpenseProps";
import { prisma } from "./database.server";

export async function addExpense(expenseData: ExpenseProps) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpenses() {
  try {
    return await prisma.expense.findMany({ orderBy: { date: "desc" } });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpense(id: string) {
  try {
    return await prisma.expense.findFirst({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateExpense(id: string, expenseData: ExpenseProps) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteExpense(id: string) {
  try {
    return await prisma.expense.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
