import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { FlipNumber } from 'react-native-flip-timer';
import {
  setQuestionClickedCard,
  setQuestionClickedFlip,
  setQuestionClicked,
  setBackButtonClicked
} from '../../reducers/questions';

const Question = () => {

  const question = useSelector(state => state.questionsReducer.question);
  const backClicked = useSelector(state => state.questionsReducer.backClicked);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (backClicked) {
      const newArray = question.answers.filter(i => i.clicked);
      if (newArray.length) {
        question.answers.forEach((i, index) => {
          if (i.clicked) {
            handleClick(i, index);
          }
        });
      }
      setTimeout(() => {
        navigation.goBack();
        dispatch(setBackButtonClicked(false))
      }, newArray.length ? 555 : 0)
    }
  }, [backClicked]);

  const handleClick = (item, index) => {
    dispatch(setQuestionClicked(item, index));
    setTimeout(() => {
      dispatch(setQuestionClickedFlip(item, index));
    }, item.clicked ? 344 : 0);
    setTimeout(() => {
      dispatch(setQuestionClickedCard(item, index));
    }, item.clicked ? 433 : 0);
  };

  const renderItem = ({ item, index }) => {
    let newNumber = item.number;
    if (item.number === 9 || item.number % 10 === 9) {
      newNumber = item.number - 1
    } else {
      newNumber = item.number + 1
    }
    return (
      <ListItem
        topDivider={index === 0}
        title={item.answer}
        rightElement={
          <TouchableOpacity activeOpacity={1} onPress={() => handleClick(item, index)}>
            <FlipNumber
              number={item.clicked ? item.number : newNumber}
              size={24}
              flipCardStyle={{ opacity: item.clickedCard ? 1 : 0 }}
              cardStyle={{ opacity: item.clickedFlip ? 1 : 0 }}
            />
          </TouchableOpacity>
        }
        bottomDivider
      />
    )
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{question.question}</Text>
      </View>
      {question && question.answers ? (
        <FlatList
          data={question.answers}
          renderItem={renderItem}
          keyExtractor={(i, index) => `${index}`}
        />
      ) : null}
    </View>
  )
};

export default Question;

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 15,
    marginBottom: 15
  },
  titleText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10
  }
});

