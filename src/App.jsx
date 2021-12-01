import LoadingScreen from '@components/common/LoadingScreen'
import Layout from '@components/Layout'
import { setToken } from '@utils/token'
import ViewNotFound from '@views/ViewNotFound'
import { ConnectedRouter } from 'connected-react-router'
import { useAuth } from 'oidc-react'
import { Suspense, useEffect } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'

import routes from './routes'
import configureStore from './store/index'

function App() {
  const { store, history } = configureStore()
  const auth = useAuth()

  useEffect(() => {
    if (auth.userData?.access_token) {
      setToken(auth.userData.access_token)
    }
  }, [auth.userData])

  if (auth.isLoading) return <LoadingScreen />

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout>
          <Suspense fallback={<LoadingScreen />}>
            <Switch>
              {routes.map((route) => (
                <Route key={route.key} {...route} />
              ))}
              <Route component={ViewNotFound} />
            </Switch>
          </Suspense>
        </Layout>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
