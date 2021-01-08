import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import NumberContainer from "../components/NumberContainer";
import colors from "../constants/colors";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText> {itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.inputNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState(0);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { inputNumber, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === inputNumber) {
      onGameOver(rounds);
    }
  }, [currentGuess, inputNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.inputNumber) ||
      (direction === "higher" && currentGuess > props.inputNumber)
    ) {
      Alert.alert("Don't lie!", "You know this is wrong...", [
        { text: "sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else if (direction === "higher") {
      currentLow.current = currentGuess;
    }
    const nextGuess = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
    setRounds((curRound) => curRound + 1);
    setPastGuesses((pastGuesses) => [nextGuess, ...pastGuesses]);
  };

  if (Dimensions.get("window").height < 500) {
    return (
      <View style={styles.screen}>
        <NumberContainer
          style={styles.control}
          title="Opponent Guess"
          selectedNumber={currentGuess}
          state={1}
          nextGuess={nextGuessHandler}
        />
        <MainButton
          style={{ backgroundColor: colors.accent }}
          onPress={props.backMain}
        >
          <Text>back to main</Text>
        </MainButton>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(key) => key.toString()}
            contentContainerStyle={styles.list}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
          ></FlatList>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <NumberContainer
        title="Opponent Guess"
        selectedNumber={currentGuess}
        state={1}
        nextGuess={nextGuessHandler}
      />
      <MainButton
        style={{ backgroundColor: colors.accent }}
        onPress={props.backMain}
      >
        <Text>back to main</Text>
      </MainButton>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(key) => key.toString()}
          contentContainerStyle={styles.list}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  listItem: {
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width > 500 ? "60%" : "80%",
  },
  control: {
    flexDirection:'row'
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listContainer: {
    flex: 1,
    width: "80%",
  },
});

export default GameScreen;
