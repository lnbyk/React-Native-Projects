import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

import colors from "../constants/colors";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonPosition, setButtonPosition] = useState(Dimensions.get('window').width / 4);


  const numberInputHandler = (v) => {
    setEnteredValue(v.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
    setSelectedNumber();
  };



  useEffect(() => {
    const updateLayout = () => {
      setButtonPosition(Dimensions.get('window').width / 4);
    }
  
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number !",
        "Number should be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };
  return (
    <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game</TitleText>
            <Card style={styles.inputContainer}>
              <Text>Select a Number</Text>
              <Input
                style={styles.textInput}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonPosition}}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={colors.accent}
                  />
                </View>
                <View style={{width: buttonPosition }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={colors.primary}
                  />
                </View>
              </View>
            </Card>
            <NumberContainer
              title="Chosen"
              selectedNumber={selectedNumber}
              state={0}
              startGame={props.startGame}
            ></NumberContainer>
          </View>
        </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  inputContainer: {
    marginVertical: 10,
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    alignItems: "center",
    fontFamily: "open-sans-bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  textInput: {
    width: 50,
    textAlign: "center",
  },
  button: {
    width: Dimensions.get("window").width / 4,
  },
});

export default StartGameScreen;
