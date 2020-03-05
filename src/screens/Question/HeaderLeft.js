import React from 'react';
import { HeaderBackButton } from "@react-navigation/stack";
import {setBackButtonClicked} from "../../reducers/questions";
import {useDispatch} from "react-redux";

const QuestionHeaderLeft = () => {

  const dispatch = useDispatch();

  return (
    <HeaderBackButton
      truncatedLabel="Назад"
      backTitleVisible={true}
      title="Назад"
      onPress={() => dispatch(setBackButtonClicked(true))}
    />
  )
};

export default QuestionHeaderLeft;
