import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    setExpenses: (state, action) => {
      const inverted = action.payload.reverse()
      state.expenses = inverted;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action) => {
      const expenseToRemove = state.expenses.find(
        (expense) => expense.id === action.payload.id
      );
      state.expenses.splice(state.expenses.indexOf(expenseToRemove), 1);
    },
    updateExpense: (state, action) => {
      state.expenses.forEach((expense) => {
        if (expense.id === action.payload.id) {
          expense.description = action.payload.description;
          expense.amount = action.payload.amount;
          expense.date = action.payload.date;
        }
      });
    },
  },
});

export const setExpenses = expensesSlice.actions.setExpenses;
export const addExpense = expensesSlice.actions.addExpense;
export const removeExpense = expensesSlice.actions.removeExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export default expensesSlice.reducer;
