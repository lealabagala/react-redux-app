import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECT = 'api/CONNECT'
export const CONNECT_SUCCESS = 'api/CONNECT_SUCCESS'
export const CONNECT_FAIL = 'api/CONNECT_FAIL'

export const SEARCH = 'api/SEARCH'
export const SEARCH_SUCCESS = 'api/SEARCH_SUCCESS'
export const SEARCH_FAIL = 'api/SEARCH_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function connectToAPI () {
  return {
    [CALL_API]: {
      endpoint: '/api/',
      method: 'GET',
      types: [ CONNECT, CONNECT_SUCCESS, CONNECT_FAIL ],
    },
  }
}

export function search (searchString) {
  let searchQuery = `{
    search(searchString: "${searchString}") {
      users {
        id,
        firstName,
        lastName,
        properties {
          street,
          city,
          state,
          rent
        }
      },
      properties {
        street,
        city,
        state,
        rent,
        user {
          id,
          firstName,
          lastName,
        }
      }
    }
  }`
  return {
    [CALL_API]: {
      endpoint: `/api/graphql?query=${searchQuery}`,
      method: 'GET',
      types: [ SEARCH, 
        {
          type: SEARCH_SUCCESS,
          payload: (action, state, res) => res.json(),
          meta: {
            searchString,
          },
        }, 
        SEARCH_FAIL 
      ],
    },
  }
}

export const actions = {
  connectToAPI,
  search,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {}

// ------------------------------------
// Connect to API action handlers
// ------------------------------------
ACTION_HANDLERS[CONNECT] = state => {
  return state.merge({
    connecting: true,
    success: false,
    error: null,
  })
}

ACTION_HANDLERS[CONNECT_SUCCESS] = (state, action) => {
  return state.merge({
    connecting: false,
    success: true,
    connection: action.payload,
    error: null,
  })
}

ACTION_HANDLERS[CONNECT_FAIL] = (state, action) => {
  return state.merge({
    connecting: false,
    success: false,
    error: action.payload.response.error,
  })
}

ACTION_HANDLERS[SEARCH] = state => {
  return state.merge({
    success: false,
    error: null,
  })
}

ACTION_HANDLERS[SEARCH_SUCCESS] = (state, action) => {
  return state.merge({
    success: true,
    searchResult: action.payload.data.search,
    searchString: action.meta.searchString,
    error: null,
  })
}

ACTION_HANDLERS[SEARCH_FAIL] = (state, action) => {
  return state.merge({
    success: false,
    error: action.payload.response.error,
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  error: null,
  connection: null,
  searchResult: {
    users: [],
    properties: []
  },
  searchString: '',
})

export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
