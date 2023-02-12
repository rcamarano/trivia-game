import { UPDATE_EMAIL, UPDATE_USERNAME, UPDATE_SCORE, TOTAL_SCORE } from '../actions';

const INITIAL_STATE = {
  email: '',
  userName: '',
  score: 0,
  correct: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_EMAIL:
    return {
      ...state,
      email: action.email,
    };

  case UPDATE_USERNAME:
    return {
      ...state,
      userName: action.userName,
    };

  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };

  case TOTAL_SCORE:
    return {
      ...state,
      correct: state.correct + action.correct,
    };
  default:
    return state;
  }
};

export default player;
