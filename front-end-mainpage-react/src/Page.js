import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import App from './App';

export default () => (
    <Router>
        <Switch>

            <Route exact path="/" render={() => window.location.href="http://localhost:8000/welcome.html"} />

            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" render={() => window.location.href="http://localhost:8000/login.html"} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)