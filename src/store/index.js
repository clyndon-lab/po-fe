import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose,createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers/root-reducer'

export const history = createBrowserHistory()

const middleware = routerMiddleware(history)

const loggerMiddleware = createLogger({
  predicate: () => import.meta.env.DEV,
})

export const middleWares = [thunk, middleware, loggerMiddleware]

export default function configureStore(initialState) {
  const store = createStore(
    reducers(history),
    initialState,
    compose(applyMiddleware(...middleWares))
  )
  return {
    store,
    history,
  }
}
