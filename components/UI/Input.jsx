import React, { useEffect, useReducer } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import Colors from "../../constants/Colors";
import { Text } from "../Texts";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };

    case "BLUR":
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initialValidity,
    touched: false,
  });
  
  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      props.onInputChange( id, inputState.value, inputState.isValid);
    }
  }, [id, inputState, onInputChange ]);

  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: "CHANGE", value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: "BLUR" });
  };

  return (
    <View style={styles.formControl}>
      <Text>{props.label}</Text>
      <TextInput
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        {...props}
      />
      {!inputState.isValid && <Text style={{ fontSize: 14, color: Colors.Danger }}>{props.errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    marginVertical: 8,
  },

  input: {
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Secondary,
    fontFamily: "poppins",
    fontSize: 16,
  },
});

export default Input;
