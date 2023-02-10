import { UPDATE_EMAIL, UPDATE_USERNAME } from '../actions';

const INITIAL_STATE = {
  email: '',
  userName: '',
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
  default:
    return state;
  }
};

export default player;
