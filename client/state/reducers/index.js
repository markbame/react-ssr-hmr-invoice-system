import { combineReducers } from 'redux'
import users from './users'
import invoice from './invoice'
import item from './item'
import products from './products'

const allReducers = {
  products,
  users,
  invoice,
  item
}

export const reducers = combineReducers( allReducers)
