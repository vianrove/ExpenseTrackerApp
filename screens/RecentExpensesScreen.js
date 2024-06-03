import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import { getDateMinusDays } from "../util/date";
import { useEffect, useState } from "react";
import { getExpenses } from "../util/http";
import { UseDispatch } from "react-redux";
import { setExpenses } from "../store/redux/expenses";
import LoadingOverlay from "../components/loadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

const RecentExpensesScreen = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        dispatch(setExpenses(expenses));
      } catch (error) {
        setError(`Could not fetch expenses!, error message: ${error}`);
      }
      setIsFetching(false);
    };

    fetchExpenses();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const expenseDate = new Date(expense.date);
    return expenseDate > date7DaysAgo;
  });

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View>
      <ExpensesOutput
        periodName="Last 7 days"
        expenses={recentExpenses}
        fallBackText={"No expenses registered for the last 7 days :D"}
      />
    </View>
  );
};

export default RecentExpensesScreen;

const styles = StyleSheet.create({});
