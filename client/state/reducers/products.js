'use strict'
export default (
  state = { value: [], loading: false, error: false },
  action
) => {
  switch (action.type) {
    case 'FETCHED_PRODUCTS':
      state = {
        ...state,
        products: action.data,
        loading: false,
        error: false
      }
      return state
    case 'FETCHED_PRODUCT':
      state = {
        ...state,
        product: action.data,
        loading: false,
        error: false
      }
      return state
    case 'UPSERTED_PRODUCT':
        state = {
          ...state,
          product: action.newData,
          loading: false,
          error: false
        }
        return state
    default:
      return state
  }
}
