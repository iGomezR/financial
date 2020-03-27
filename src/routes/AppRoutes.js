import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from '../components/Home';
import Calculator from '../components/Calculator';

const AppRoutes = () => (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/calculator" component={Calculator} />
    </Switch>
);

export default AppRoutes;