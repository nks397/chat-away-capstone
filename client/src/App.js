import React, {useContext} from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import Auth from "./components/auth/Auth"
import ProtectedRoute from "./components/ProtectedRouted"
import Navbar from "./components/Navbar"
import Home from "./components/home/Home"
import Settings from "./components/settings/Settings"
import ChangeProfilePic from "./components/settings/ChangeProfilePic"
import ChangeTheme from "./components/settings/ChangeTheme"
import About from "./components/settings/About"
import Contact from "./components/settings/Contact"
import {UserContext} from "./context/UserProvider"
import Chat from "./components/home/Chat"
// import Conversations from "./components/home/Conversations"
import Messenger from "./components/home/Messenger"
// import image from "./trivia-break.png"

function App() {
  const {token, logout, members} = useContext(UserContext)

  return (
    <div className="App">
      {token && <Navbar logout={logout} />}
      {/* if token is true, redirect to Home page. if false, stay on Auth page */}
      {/* Home protected route  */}
      {/* Setting protected route */}
      <Switch>
        <Route 
          exact path="/"
          render={()=> token ? <Redirect to = "/home" /> : <Auth />}
        />
        {/* <img src={image} alt="" /> */}
        <ProtectedRoute 
          exact path="/home"
          component={Home}
          redirectTo="/"
          token={token}
        />
        {/* <ProtectedRoute 
          path="/home/chat"
          component={Chat}
          redirectTo="/"
          token={token}
        /> */}
        <ProtectedRoute 
          path="/settings"
          component={Settings}
          redirectTo="/"
          token={token}
        />
     
        {/*  protected routes for settings */}
        <ProtectedRoute 
          path="/avatar"
          component={ChangeProfilePic}
          redirectTo="/"
          token={token}
        />
        <ProtectedRoute 
          path="/theme"
          component={ChangeTheme}
          redirectTo="/"
          token={token}
        />
        <ProtectedRoute 
          path="/about"
          component={About}
          redirectTo="/"
          token={token}
        />
        <ProtectedRoute 
          path="/contact"
          component={Contact}
          redirectTo="/"
          token={token}
        />
      </Switch>

    </div>
  )
}
export default App