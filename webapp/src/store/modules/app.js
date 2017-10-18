import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'

// ------------------------------------
// Constants
// ------------------------------------
export const SEARCH = 'api/SEARCH'
export const SEARCH_SUCCESS = 'api/SEARCH_SUCCESS'
export const SEARCH_FAIL = 'api/SEARCH_FAIL'

export const CLEAR_SEARCH = 'api/CLEAR_SEARCH'

const searchObject = {
  users: [],
  properties: [],
  searchStrings: []
}

// ------------------------------------
// Actions
// ------------------------------------

export function search (searchString, searchType='final') {
  let re = new RegExp(`"`, 'g')

  let searchQuery = `{
    search(searchString: "${searchString.replace(re, `\\\"`)}") {
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
      searchStrings
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
            searchType,
          },
        }, 
        SEARCH_FAIL 
      ],
    },
  }
}

export function clearSearch() {
  return {
    type: CLEAR_SEARCH
  }
}

export const actions = {
  search,
  clearSearch,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {}

// ------------------------------------
// Connect to API action handlers
// ------------------------------------

ACTION_HANDLERS[SEARCH] = state => {
  return state.merge({
    success: false,
    error: null,
  })
}

ACTION_HANDLERS[SEARCH_SUCCESS] = (state, action) => {
  let obj = action.meta.searchType === 'final' ? 'searchResult' : 'preSearchResult'
  return state.merge({
    success: true,
    [obj]: action.payload.data.search,
    error: null,
  })
}

ACTION_HANDLERS[SEARCH_FAIL] = (state, action) => {
  return state.merge({
    success: false,
    error: action.payload.response.error,
  })
}

ACTION_HANDLERS[CLEAR_SEARCH] = (state) => {
  return state.merge({
    searchResult: searchObject,
  })
}



// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  error: null,
  searchResult: searchObject,
  preSearchResult: searchObject,
})

export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
