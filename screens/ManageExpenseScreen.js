import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useSelector, useDispatch } from "react-redux";

import {
  addExpense,
  removeExpense,
  updateExpense,
} from "../store/redux/expenses";
import ExpenseForm from "../components/ExpenseForm";
import {
  storeExpense,
  updateExpenseBackend,
  deleteExpense,
} from "../util/http";
import LoadingOverlay from "../components/loadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

const ManageExpenseScreen = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expenseId = route.params?.expenseId; // it is found, it is returned, if not, it just returns undefined
  const isEditing = !!expenseId; // converts value into boolean, undefined to false
  const expenses = useSelector((state) => state.expenses.expenses);
  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(expenseId);
      dispatch(removeExpense({ id: expenseId }));
      navigation.goBack();
    } catch (error) {
      setError(`Could not delete the expense! error message: ${error}`);
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    try {
      if (isEditing) {
        dispatch(
          updateExpense({
            id: expenseId,
            description: expenseData.description,
            amount: expenseData.amount,
            date: expenseData.date,
          })
        );
        setIsSubmitting(true);
        await updateExpenseBackend(expenseId, {
          description: expenseData.description,
          amount: expenseData.amount,
          date: expenseData.date,
        });
        setIsSubmitting(false);
      } else {
        setIsSubmitting(true);
        const id = await storeExpense(expenseData);
        setIsSubmitting(false);
        dispatch(addExpense({ ...expenseData, id: id }));
      }
      navigation.goBack();
    } catch (error) {
      setError(`Could not save data. error message: ${error}`);
      setIsSubmitting(false);
    }
  };

  const errorHandler = () => {
    navigation.goBack();
    setError(null);
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteButtonContainer}>
          <IconButton
            icon="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={() => deleteExpenseHandler()}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary600,
    justifyContent: "space-between",
  },

  deleteButtonContainer: {
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary800,
    alignItems: "center",
    paddingTop: 4,
    marginTop: 8,
  },
});
