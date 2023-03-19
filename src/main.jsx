import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ComponentProvider } from "./contexrt/ComponentContect"
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <ComponentProvider>
          <App />
      </ComponentProvider>

    </Provider>

  // </React.StrictMode>
)
