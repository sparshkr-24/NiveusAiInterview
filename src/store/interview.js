import generateToken from "../utils/generateToken";
import interviewApi from '../api/interview'
import { getQuestion, resetSessionStore } from "./session";
import { TAB_SECTION_NAMES } from "../data/answerType";
import { resetReportStore } from "./report";
import { resetIChatStore } from "./chatMessage";

const START_INTERVIEW_INIT = 'START_INTERVIEW_INIT'
const START_INTERVIEW_ERROR = 'START_INTERVIEW_ERROR'
const START_INTERVIEW_DONE = 'START_INTERVIEW_DONE'
const UPDATE_INTERVIEW_TAB = 'UPDATE_INTERVIEW_TAB'
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
      dispatch(getQuestion())
    } catch (error) {
      dispatch({
        type: START_INTERVIEW_ERROR,
        payload: error.message
      })
    }
  }
}

export const updateTab = ({ activeTab }) => {
  return {
    type: UPDATE_INTERVIEW_TAB,
    payload: activeTab
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
    dispatch(resetReportStore())
    dispatch(resetIChatStore())
    localStorage.removeItem('sessionToken')
  })
}

const initialState = {
  isLoading: false,
  loaded: false,
  loadError: null,
  sessionToken: null,
  activeTab: TAB_SECTION_NAMES.interview
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
    case UPDATE_INTERVIEW_TAB:
      return {
        ...state,
        activeTab: action.payload
      }
    case RESET_INTERVIEW_STORE:
      return initialState
    default:
      return state;
  }
}

export default reducer;
