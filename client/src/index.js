import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import Store from "../src/Redux/store/store.js";


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        {/* <GoogleTranslate /> */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
