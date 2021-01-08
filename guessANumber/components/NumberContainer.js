import React from "react";
import { View, StyleSheet, Text, Button, Dimensions} from "react-native";
import colors from "../constants/colors";
import Card from "./Card";
import BodyText from "./BodyText";
import DefaultStyles from "../constants/default-styles";
import MainButton from "./MainButton";
import { Ionicons } from "@expo/vector-icons";

const NumberContainer = (props) => {
  let buttonGroup;
  switch (props.state) {
    case 0:
      buttonGroup = (
        <View>
          <MainButton
            onPress={() => {
              props.startGame(props.selectedNumber);
              console.log("www");
            }}
          >
            Start Game !
          </MainButton>
        </View>
      );
      break;
    case 1:
      buttonGroup = (
        <View style={styles.buttonContainer}>
          <MainButton
            style={styles.iconButton}
            onPress={props.nextGuess.bind(this, "lower")}
          >
            <Ionicons name="md-remove" size={18} colo="white" />
          </MainButton>

          <MainButton
            style={styles.iconButton}
            onPress={props.nextGuess.bind(this, "higher")}
          >
            <Ionicons name="md-add" size={18} colo="white" />
          </MainButton>
        </View>
      );
      break;
  }
  return (
    <Card style={styles.selectedNumberContainer}>
      <BodyText style={DefaultStyles.BodyText}>{props.title}</BodyText>
      <Text style={styles.selectedNumber}> {props.selectedNumber}</Text>
      {buttonGroup}
    </Card>
  );
};

const styles = StyleSheet.create({
  selectedNumberContainer: {
    width: 200,
    height: 200,
    marginHorizontal: "auto",
    marginVertical: Dimensions.get("window").height > 600 ? 30 : 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  selectedNumber: {
    color: colors.primary,
    fontSize: 80,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  iconButton: {
    paddingHorizontal: 15,
  },
});

export default NumberContainer;
