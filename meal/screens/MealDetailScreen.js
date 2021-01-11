import React, { useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/Color";
import DefaultText from "../components/DefaultText";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

import CustomHeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meal";

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const availableMeals = useSelector((state) => state.meals.meals);
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const isCurrentMealFavorite = useSelector((state) =>
  state.meals.favoriteMeals.some((meal) => meal.id === mealId)
);
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFavMeal: isCurrentMealFavorite });
  }, [isCurrentMealFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.description}>
          <DefaultText>{selectedMeal.duration}m</DefaultText>
        </View>
        <View style={styles.description}>
          <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        </View>
        <View style={styles.description}>
          <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
        </View>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFav = navigationData.navigation.getParam("toggleFav");
  const isFavMeal = navigationData.navigation.getParam("isFavMeal");
  return {
    headerTitle: mealTitle,
    headerTitleStyle: {
      color: Colors.primaryColor,
    },
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavMeal ? "ios-star" : "ios-star-outline"}
          onPress={toggleFav}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  description: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "rgba(171,160,160,0.6)",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
