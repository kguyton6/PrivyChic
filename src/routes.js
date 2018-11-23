import React from 'react'
import Home from './components/login/Home'
import {Switch, Route} from 'react-router-dom'
import {withRouter} from 'react-router'
import Dashboard from './components/Dashboard/Dashboard'
import help from './help'
import Login from './components/login/modal/Login'
import Search from './components/search/Search'
import Profile from './components/profile/Profile'
import Business from './components/business/Business'
import ShowTheLocationWithRouter from './components/ShowTheLocation'
import Business_Form from './components/forms/Business_Form'


const routes = (

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/home' component={Home} />
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route path='/help' component={help}/>
          <Route path='/login' component={Login}/>
          <Route path='/search' component={Search}/>
          <Route path='/profile/:id' component={Profile} />
          <Route path='/business' component={Business} />
          <Route path='/business/form' component={Business_Form} />
        </Switch>
)

export default routes