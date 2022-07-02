import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import UserProvider from "./context/UserProvider"
import SettingsProvider from "./context/SettingsProvider"
import "./styles.scss"
import "./index.scss"
import App from "./App"
import MembersProvider from "./context/MembersProvider"
import MessageProvider from "./context/MessageProvider"

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <MessageProvider>
        <MembersProvider>
            <SettingsProvider>
                <App />
            </SettingsProvider>
        </MembersProvider>
      </MessageProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
)