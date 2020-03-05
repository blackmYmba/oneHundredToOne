import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";
import { ActivityIndicator, StyleSheet } from "react-native";
import { setQuestionData } from "../../reducers/questions";

const QuestionItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [ click, setClick ] = useState(false);

  const fetchQuestionData = async () => {
    const resp = await fetch(item.url);
    const respJson = await resp.json();
    dispatch(setQuestionData(respJson));
    setClick(false);
    navigation.navigate('Question');
  };

  return (
    <ListItem
      title={item.title}
      titleStyle={styles.titleText}
      bottomDivider
      chevron={!!item.url && !click}
      rightElement={click ? <ActivityIndicator size="small" color="tomato" /> : null}
      onPress={() => {
        if (item.url) {
          setClick(true);
          fetchQuestionData();
        }
      }}
    />
  )
};

export default QuestionItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    textAlign: 'left',
    fontSize: 16
  }
});
