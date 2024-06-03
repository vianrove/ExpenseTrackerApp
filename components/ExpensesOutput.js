import { StyleSheet, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../constants/styles";

const ExpensesOutput = ({ expenses, periodName, fallBackText }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  let content = <Text style={styles.infoText}>{fallBackText}</Text>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }

  return (
    <View>
      <View style={styles.expensesSummaryContainer}>
        <Text style={styles.periodName}>{periodName}</Text>
        <Text style={styles.totalAmountText}>$ {expensesSum.toFixed(2)}</Text>
      </View>
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  expensesSummaryContainer: {
    padding: 14,
    marginBottom: 4,
    backgroundColor: GlobalStyles.colors.primary200,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  periodName: {
    fontSize: 18,
    color: GlobalStyles.colors.primary600
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary800
  },
  infoText: {
    color: GlobalStyles.colors.primary800,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  }
});
