import { FlatList, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
  const renderItem = (itemData) => {
    return <ExpenseItem {...itemData.item} />;
  };

  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpensesList;
