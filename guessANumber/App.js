import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";

// screens
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    console.log(1);
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numOfRounds) => {
    console.log(numOfRounds);
    setGuessRounds(numOfRounds);
  };

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  let content = <StartGameScreen startGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen inputNumber={userNumber} onGameOver={gameOverHandler} backMain={configureNewGameHandler}>
      </GameScreen>
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        rounds={guessRounds}
        numberWas={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  } else {
    content = <StartGameScreen startGame={startGameHandler}/>;
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
