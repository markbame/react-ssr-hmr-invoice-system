import React from 'react'
import { renderToString } from 'react-dom/server'

import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes, matchRoutes } from 'react-router-config'

import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { reducers } from '../client/state/reducers/'

const initialState = {}
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))

import express from 'express'

import App from '../client/app'
import routes from '../client/routes'

const router = express.Router()

router.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url)
  const promises = branch.map(({ route }) => {
    let fetchData = route.component.fetchData
    return fetchData instanceof Function
      ? fetchData(store)
      : Promise.resolve(null)
  })
  return Promise.all(promises).then(data => {
    let context = {}
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    )

   let pageStatus = true
   if(context.status === 404) {
      res.status(404);
      pageStatus = false
   }
    res.render('index', { title: 'Express', data: store.getState(), content, pageStatus })
  })
})

module.exports = router
