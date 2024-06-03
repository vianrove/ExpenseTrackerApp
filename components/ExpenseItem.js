import { StyleSheet, Text, View, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { getFormattedDate } from "../util/date";

import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({ id, description, date, amount }) => {
  const navigation = useNavigation();

  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", {
        expenseId: id
    });
  };
  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.descriptionText}>{description}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>$ {amount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 4,
    backgroundColor: GlobalStyles.colors.primary300,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountContainer: {
    backgroundColor: GlobalStyles.colors.primary800,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 70,
    padding: 8,
    borderRadius: 8,
  },
  descriptionText: {
    color: GlobalStyles.colors.primary800,
    fontWeight: "bold",
  },
  amountText: {
    color: GlobalStyles.colors.primary100,
    fontWeight: "bold",
  },
  dateText: {
    color: GlobalStyles.colors.primary800,
    fontSize: 12,
  },
  pressed: {
    opacity: 0.75,
  },
});
