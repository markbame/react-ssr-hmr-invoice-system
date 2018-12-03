'use strict'
export default (
  state = { value: [], loading: false, error: false },
  action
) => {
  switch (action.type) {
    case 'FETCHED_INVOICES':
      state = {
        ...state,
        invoices: action.data,
        loading: false,
        error: false
      }
      return state
    case 'FETCHED_INVOICE':
      state = {
        ...state,
        invoice: action.data,
        loading: false,
        error: false
      }
      return state
    case 'UPSERTED_INVOICE':
        state = {
          ...state,
          invoice: action.newData,
          loading: false,
          error: false
        }
        return state
    default:
      return state
  }
}
