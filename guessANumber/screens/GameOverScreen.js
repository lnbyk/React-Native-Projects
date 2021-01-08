import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import colors from "../constants/colors";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  const { rounds, onRestart, numberWas } = props;
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText> Game is Over</TitleText>
        <Image
          source={require("../assets/success.png")}
          style={styles.imageContainer}
          resizeMode="cover"
        />
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            You phone need <Text style={styles.highlight}>{rounds}</Text> rounds
            to guess the number{" "}
            <Text style={styles.highlight}>{numberWas}</Text>.
          </BodyText>
        </View>
        <MainButton onPress={onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    marginVertical: Dimensions.get("window").height / 30,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 20 : 10,
  },
});

export default GameOverScreen;
