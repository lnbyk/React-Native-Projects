import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import DefaultText from "../components/DefaultText";

import { CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import MealList from "../components/MealList";

// choose states from our store
import { useSelector } from "react-redux";
const CategoryMealsScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  if (!displayedMeals || displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategoryMealsScreen;
