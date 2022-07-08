import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import UserProvider from "./context/UserProvider"
import SettingsProvider from "./context/SettingsProvider"
import "./styles.scss"
import "./index.scss"
import App from "./App"
import MembersProvider from "./context/MembersProvider"

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
        <MembersProvider>
            <SettingsProvider>
                <App />
            </SettingsProvider>
        </MembersProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
)