import React from 'react';
import {FlatList, ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import { useSelector } from 'react-redux';
import QuestionItem from './QuestionItem';


const Questions = () => {

  const questions = useSelector(state => state.questionsReducer.questions);

  const renderItem = ({ item }) => {
    return (
      <QuestionItem item={item} />
    )
  };

  const renderHeader = () => {
    const vkName = useSelector(state => state.authReducer.vkName);
    return (
      vkName ? (
        <View style={styles.vkNameContainer}>
          <Text style={styles.vkTitle}>{`Привет, ${vkName}!`}</Text>
        </View>
      ) : null
    )
  };

  const RenderEmpty = () => {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    )
  };

  return (
    questions && questions.length
      ? (
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(i) => JSON.stringify(i)}
        ListHeaderComponent={renderHeader}
      />
    ) : <RenderEmpty />
  )
};

export default Questions;

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  vkNameContainer: {
    marginTop: 15,
    marginBottom: 15
  },
  vkTitle: {
    fontSize: 16,
    textAlign: 'center'
  }
});
