import React from "react";
import Home from "./components/Home";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import help from "./help";
import Login from "./components/modal/login/Login";
import Search from "./components/search/Search";
import Profile from "./components/profile/Profile";
import Business from "./components/business/Business";
import Business_Form from "./components/forms/Business_Form";
import Appointment from "./components/forms/Appointment";
import TakeMoney from "./components/stripe/TakeMoney";

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/business" component={Business} />
    <Route path="/search" component={Search} />
    <Route exact path="/dashboard/:user/:id" component={Dashboard} />
    <Route path="/help" component={help} />
    <Route path="/login" component={Login} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="/appointments/:id/:service_id" component={TakeMoney} />
    <Route path="/calendar/:id" component={Profile} />
    <Route path='/business/form' component={Business_Form} />
  </Switch>
);

export default routes;
