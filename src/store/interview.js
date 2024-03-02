import generateToken from "../utils/generateToken";
import interviewApi from '../api/interview'
import { resetSessionStore } from "./session";

const START_INTERVIEW_INIT = 'START_INTERVIEW_INIT'
const START_INTERVIEW_ERROR = 'START_INTERVIEW_ERROR'
const START_INTERVIEW_DONE = 'START_INTERVIEW_DONE'
const RESET_INTERVIEW_STORE = 'RESET_INTERVIEW_STORE'

export function startInterview() {
  return async (dispatch) => {
    dispatch({
      type: START_INTERVIEW_INIT
    })
    try {
      const token = generateToken();
      dispatch({
        type: START_INTERVIEW_DONE,
        payload: token
      })
      localStorage.setItem('sessionToken', token)
      await interviewApi.login()
    } catch (error) {
      dispatch({
        type: START_INTERVIEW_ERROR,
        payload: error.message
      })
    }
  }
}

export const resetInterviewStore = () => {
  return {
    type: RESET_INTERVIEW_STORE,
  }
}

export const masterResetStore = () => {
  return (async (dispatch) => {
    dispatch(resetInterviewStore())
    dispatch(resetSessionStore())
    localStorage.removeItem('sessionToken')
  })
}

const initialState = {
  isLoading: false,
  loaded: false,
  loadError: null,
  sessionToken: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case START_INTERVIEW_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case START_INTERVIEW_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        loadError: action.payload,
      };
    case START_INTERVIEW_DONE:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        sessionToken: action.payload
      };
    case RESET_INTERVIEW_STORE:
      return initialState
    default:
      return state;
  }
}

export default reducer;
