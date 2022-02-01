import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import UserProvider from "./context/UserProvider"
import SettingsProvider from "./context/SettingsProvider"
import "./styles.scss"
import "./index.scss"
import App from "./App"

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <SettingsProvider>
          <App />
      </SettingsProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
)