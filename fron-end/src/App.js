import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';

// import { renderRoutes } from 'react-router-config';
import getMedia from '../src/views/getMedia/getMedia';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" name="Welcome" render={() => window.location.href="/welcome"} />
          <Route path="/main" name="Home" component={DefaultLayout} />
          <Route exact path="/login" name="Login Page" render={() => window.location.href="/login.html"} />
          <Route exact path="/register" name="Register Page" render={() => window.location.href="/login.html"} />
          <Route exact path="/getMedia" name="getMeida Page" component={getMedia} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          {/*<Route path="/" name="Home" component={DefaultLayout} />*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
