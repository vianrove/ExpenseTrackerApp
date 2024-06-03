import { View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";

import { useSelector } from "react-redux";

const AllExpensesScreen = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  return (
    <View style={{ flex: 1 }}>
      <ExpensesOutput
        periodName="Total"
        expenses={expenses}
        fallBackText={"No expenses registered"}
      />
    </View>
  );
};

export default AllExpensesScreen;
