import interviewApi from "../api/interview"
import { TAB_SECTION_NAMES } from "../data/answerType"
import { updateTab } from "./interview"

const GET_REPORT_INIT = 'GET_REPORT_INIT'
const GET_REPORT_ERROR = 'GET_REPORT_ERROR'
const GET_REPORT_DONE = 'GET_REPORT_DONE'
const RESET_REPORT_STORE = 'RESET_REPORT_STORE'

export function getAiReport() {
  return async (dispatch) => {
    dispatch({
      type: GET_REPORT_INIT
    })
    try {
      const response = await interviewApi.getReport()
      if(!response?.report) {
        throw new Error('Cannot generate report')
      }
      dispatch(updateTab({activeTab: TAB_SECTION_NAMES.feedback}))
      dispatch({
        type: GET_REPORT_DONE,
        payload: response.report
      })
    } catch (error) {
      dispatch({
        type: GET_REPORT_ERROR,
        payload: error.message
      })
    }
  }
}

export const resetReportStore = () => {
  return {
    type: RESET_REPORT_STORE,
  }
}

const initialState = {
  isLoading: false,
  loaded: false,
  loadError: null,
  report: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_REPORT_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case GET_REPORT_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        loadError: action.payload,
      };
    case GET_REPORT_DONE:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        report: action.payload
      };
    case RESET_REPORT_STORE:
      return initialState
    default:
      return state;
  }
}

export default reducer;
