import generateToken from "../utils/generateToken";
import interviewApi from '../api/interview'

const GET_QUESTION_INIT = 'GET_QUESTION_INIT'
const GET_QUESTION_ERROR = 'GET_QUESTION_ERROR'
const GET_QUESTION_DONE = 'GET_QUESTION_DONE'
const RESET_SESSION_STORE = 'RESET_SESSION_STORE'

export function getQuestion() {
  return async (dispatch) => {
    dispatch({
      type: GET_QUESTION_INIT
    })
    try {
      const response = await interviewApi.getQuestion()
      dispatch({
        type: GET_QUESTION_DONE,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: GET_QUESTION_ERROR,
        payload: error.message
      })
    }
  }
}

export const resetSessionStore = () => {
  return {
    type: RESET_SESSION_STORE,
  }
}

const initialState = {
  isLoading: false,
  loaded: false,
  loadError: null,
  questions: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTION_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case GET_QUESTION_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        loadError: action.payload,
      };
    case GET_QUESTION_DONE:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        questions: [...state.questions, action.payload]
      };
    case RESET_SESSION_STORE:
      return initialState
    default:
      return state;
  }
}

export default reducer;
