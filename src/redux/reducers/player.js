import { UPDATE_EMAIL, USER_IMAGE,
  UPDATE_USERNAME, UPDATE_SCORE, TOTAL_SCORE } from '../actions';

const INITIAL_STATE = {
  email: '',
  userName: '',
  score: 0,
  correct: 0,
  image: 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_EMAIL:
    return {
      ...state,
      email: action.email,
      score: 0,
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
  case USER_IMAGE:
    return {
      ...state,
      image: state.image,
    };
  default:
    return state;
  }
};

export default player;
