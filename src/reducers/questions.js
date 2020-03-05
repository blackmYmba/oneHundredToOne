import { createAction, handleActions } from 'redux-actions';

const INITIAL_STATE = {
  questions: [],
  question: {},
  questionsClicked: [],
  backClicked: false
};

export const setQuestions = createAction('QUESTIONS/SET_QUESTIONS', questions => ({ questions }));
export const setQuestionData = createAction('QUESTIONS/SET_QUESTION_DATA', data => ({ data }));
export const setQuestionClickedCard = createAction('QUESTIONS/SET_QUESTION_CLICKED_CARD', (item, index) => ({ item, index }));
export const setQuestionClickedFlip = createAction('QUESTIONS/SET_QUESTION_CLICKED_FLIP', (item, index) => ({ item, index }));
export const setQuestionClicked = createAction('QUESTIONS/SET_QUESTION_CLICKED', (item, index) => ({ item, index }));
export const setBackButtonClicked = createAction('QUESTIONS/SET_BACK_BUTTON_CLICKED', value => ({ value }));

const reducer = handleActions(
  {
    [setQuestions]: (state, action) => {
      const { questions } = action.payload;
      state.questions = questions.sort((a,b) => {
        if (!a.url && b.url) {
          return 1
        }
        if (a.url && !b.url) {
          return -1
        }
        return 0
      });
      return state;
    },
    [setQuestionData]: (state, action) => {
      state.question = action.payload.data;
      return state;
    },
    [setQuestionClickedCard]: (state, action) => {
      const { item, index } = action.payload;
      state.question.answers[index].clickedCard = Boolean(!item.clickedCard);
      return state;
    },
    [setQuestionClicked]: (state, action) => {
      const { item, index } = action.payload;
      state.question.answers[index].clicked = Boolean(!item.clicked);
      return state;
    },
    [setQuestionClickedFlip]: (state, action) => {
      const { item, index } = action.payload;
      state.question.answers[index].clickedFlip = Boolean(!item.clickedFlip);
      return state;
    },
    [setBackButtonClicked]: (state, action) => {
      state.backClicked = action.payload.value;
      return state;
    }
  },
  INITIAL_STATE
);

export default reducer;
