'use strict'
export default (
  state = { value: [], loading: false, error: false },
  action
) => {
  switch (action.type) {
    case 'FETCHED_ITEMS':
      state = {
        ...state,
        items: action.data,
        loading: false,
        error: false
      }
      return state
    case 'FETCHED_ITEM':
      state = {
        ...state,
        item: action.data,
        loading: false,
        error: false
      }
      return state
    case 'UPSERTED_ITEM':
        state = {
          ...state,
          item: action.newData,
          loading: false,
          error: false
        }
        return state
    default:
      return state
  }
}
