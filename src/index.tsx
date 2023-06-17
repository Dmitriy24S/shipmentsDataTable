import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store/store'

import './index.css'

// import ErrorPage from './pages/ErrorPage/ErrorPage'
const ErrorPage = React.lazy(
  () => import(/* webpackChunkName: "ErrorPage" */ './pages/ErrorPage/ErrorPage')
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary
          FallbackComponent={(props: FallbackProps) => (
            <Suspense>
              <ErrorPage
                error={props.error}
                resetErrorBoundary={props.resetErrorBoundary}
              />
            </Suspense>
          )}
          onError={() => console.log('Error happened!')}
        >
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
