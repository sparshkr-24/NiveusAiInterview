import interviewApi from '../api/interview'
import { AUDIO_ANSWER_CODES, TOTAL_QUESTIONS } from '../data/answerType'
import { addToChat } from './chatMessage'
import { getAiReport } from './report'

const GET_QUESTION_INIT = 'GET_QUESTION_INIT'
const GET_QUESTION_ERROR = 'GET_QUESTION_ERROR'
const GET_QUESTION_DONE = 'GET_QUESTION_DONE'
const SUBMIT_ANSWER_INIT = 'SUBMIT_ANSWER_INIT'
const SUBMIT_ANSWER_ERROR = 'SUBMIT_ANSWER_ERROR'
const SUBMIT_ANSWER_DONE = 'SUBMIT_ANSWER_DONE'
const GET_HINT_INIT = 'GET_HINT_INIT'
const GET_HINT_ERROR = 'GET_HINT_ERROR'
const GET_HINT_DONE = 'GET_HINT_DONE'
const INCREMENT_QUESTIONS_COUNT = 'INCREMENT_QUESTIONS_COUNT'
const RESET_SESSION_STORE = 'RESET_SESSION_STORE'

export function getQuestion() {
  return async (dispatch, getState) => {
    const { data } = getState().session.questions
    const len = data.length

    if(len === TOTAL_QUESTIONS){
      dispatch(getAiReport())
    }
    dispatch({
      type: GET_QUESTION_INIT
    })
    try {
      const response = await interviewApi.getQuestion()
      if(!response) return;
      dispatch({
        type: GET_QUESTION_DONE,
        payload: response
      })
      dispatch(addToChat({ message: response, type: 'question' }))
    } catch (error) {
      dispatch({
        type: GET_QUESTION_ERROR,
        payload: error.message
      })
    }
  }
}

export function submitAnswer({ userCode = 'no code', audioFile = null }) {
  return async (dispatch, getState) => {
    const { data, isLoading } = getState().session.questions;
    const len = data.length;

    dispatch({
      type: SUBMIT_ANSWER_INIT
    })
    try {
      let payloadData;
      if(AUDIO_ANSWER_CODES.includes(len)){
        await interviewApi.audioAnswer({ audioFile })
        payloadData = {len, answer: audioFile}
      }
      else {
        await interviewApi.codeAnswer({ userCode })
        payloadData = {len, answer: userCode}
      }
      dispatch({
        type: SUBMIT_ANSWER_DONE,
        payload: payloadData
      })
      if(!isLoading){
        dispatch(getQuestion())
      }
    } catch (error) {
      dispatch({
        type: SUBMIT_ANSWER_ERROR,
        payload: error.message
      })
    }
  }
}

export function askHint ({ code = 'no code' }) {
  return (async (dispatch) => {
    dispatch({
      type: GET_HINT_INIT
    })
    try {
      const response  = await interviewApi.getHint({ code })
      if (!response?.hint) {
        throw new Error('Hint not available');
      }
      dispatch({
        type: GET_HINT_DONE,
        payload: response
      })
      dispatch(addToChat({ message: response.hint, type: 'hint'}))
    } catch (error) {
      dispatch({
        type: GET_HINT_ERROR,
        payload: error.message
      })
    }
  })
}

export const incrementQuestionsCount = () => {
  return {
    type: INCREMENT_QUESTIONS_COUNT,
  }
}

export const resetSessionStore = () => {
  return {
    type: RESET_SESSION_STORE,
  }
}

const commonInitialState = {
  isLoading: false,
  loaded: false,
  loadError: null,
  data: []
}

const initialState = {
  questions: commonInitialState,
  answers: commonInitialState,
  hints: commonInitialState,
  questionsCount: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTION_INIT:
      return {
        ...state,
        questions: {
          ...state.questions,
          isLoading: true,
        }
      };
    case GET_QUESTION_ERROR:
      return {
        ...state,
        questions: {
          ...state.questions,
          isLoading: false,
          loaded: true,
          loadError: action.payload,
        }
      };
    case GET_QUESTION_DONE:
      return {
        ...state,
        questions: {
          ...state.questions,
          isLoading: false,
          loaded: true,
          data: [...state.questions.data, action.payload]
        }
      };
    case SUBMIT_ANSWER_INIT:
      return {
        ...state,
        answers: {
          ...state.answers,
          isLoading: true,
        }
      };
    case SUBMIT_ANSWER_ERROR:
      return {
        ...state,
        answers: {
          ...state.answers,
          isLoading: false,
          loaded: true,
          loadError: action.payload,
        }
      };
    case SUBMIT_ANSWER_DONE:
      const { len, answer } = action.payload
      return {
        ...state,
        answers: {
          ...state.answers,
          isLoading: false,
          loaded: true,
          data: [...state.answers.data, { [len]: answer }]
        }
      };
    case GET_HINT_INIT:
      return {
        ...state,
        hints: {
          ...state.hints,
          isLoading: true,
        }
      };
    case GET_HINT_ERROR:
      return {
        ...state,
        hints: {
          ...state.hints,
          isLoading: false,
          loaded: true,
          loadError: action.payload,
        }
      };
    case GET_HINT_DONE:
      return {
        ...state,
        hints: {
          ...state.hints,
          isLoading: false,
          loaded: true,
          data: [...state.hints.data, action.payload]
        }
      };
    case INCREMENT_QUESTIONS_COUNT:
      return {
        ...state,
        questionsCount: state.questionsCount + 1
      }
    case RESET_SESSION_STORE:
      return initialState
    default:
      return state;
  }
}

export default reducer;
