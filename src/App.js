import React, { Component } from 'react';
import './App.css';
import Home from './components/login/Home'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import help from './help'
import Login from './components/login/modal/Login'
import Search from './components/search/Search'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route path='/help' component={help}/>
          <Route path='/login' component={Login}/>
          <Route path='/search' component={Search}/>
        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
