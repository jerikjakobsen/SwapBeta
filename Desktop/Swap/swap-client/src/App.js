import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AuthRoute from'./util/AuthRoute'
import './App.css'
import jwtDecode from 'jwt-decode'

//MUI Imports
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {ThemeProvider} from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'

//Pages Imports
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
import park from './pages/park';
import leave from './pages/leave';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0d47a1"
    },
    secondary: {
      main: "#64b5f6"
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
})

// let authenticated
// const token = localStorage.FBIdToken;
// if(token) {
//   const decodedToken = jwtDecode(token)
//   if (decodedToken.exp * 1000 < Date.now()) {
//     window.location.href = '/login'
//     authenticated = false
//   } else {
//     authenticated = true
//   }
// }

export class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils = {DateFnsUtils} >
        <ThemeProvider theme = {theme} >
          <BrowserRouter>
            <Switch>
              <Route exact path = '/' component = {home} />
              <Route path = '/signup' component = {signup}/>
              <Route path = '/login' component = {login}/>
              <Route path = '/park' component = {park} />
              <Route path = '/leave' component = {leave} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    )
  }
}

export default App
