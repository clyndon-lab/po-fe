import 'antd/dist/antd.css'
import '@assets/css/index.css'
import '@assets/css/antd-custom.css'
import 'animate.css'

import { oidcConfig } from '@configs/oidc'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { AuthProvider } from 'oidc-react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DNS,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: import.meta.env.PROD ? 0.7 : 1.0
})

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
