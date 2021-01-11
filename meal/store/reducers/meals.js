import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVORITE } from "../actions/meal";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.glutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.lactoseFree) {
          return false;
        }
        if (appliedFilters.isVegetarian && !meal.vegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.vegan) {
          return false;
        }
        return true;
      });


      return { ...state, filteredMeals: filteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
