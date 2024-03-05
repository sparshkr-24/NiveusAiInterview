const ADD_MESSAGE_TO_CHAT = 'ADD_MESSAGE_TO_CHAT'
const RESET_CHAT_STORE = 'RESET_CHAT_STORE'

export function addToChat(data) {
  return {
    type: ADD_MESSAGE_TO_CHAT,
    payload: data
  }
}

export const resetIChatStore = () => {
  return {
    type: RESET_CHAT_STORE,
  }
}

const initialState = {
  chat: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE_TO_CHAT:
      return {
        ...state,
        chat: [...state.chat, action.payload]
      };
    case RESET_CHAT_STORE:
      return initialState
    default:
      return state;
  }
}

export default reducer;
