import { CALL_API } from 'redux-api-middleware'
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
const API_HOST = 'http://localhost:3333'
// ------------------------------------
// Actions
// ------------------------------------
export function login (username, password) {
  console.log('login')
  return {
    [CALL_API]: {
      endpoint: `${API_HOST}/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
      mode: 'no-cors',
      types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    }
  }
}

export const actions = {
  login,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]    : (state, action) => {
    console.log(action.payload)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
