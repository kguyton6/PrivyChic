import React from 'react';
import './App.css';
import PropTypes from 'prop-types'
import {BrowserRouter as Router} from 'react-router-dom'
import routes from './routes'


const App = ({ history }) => {
  return (
    <Router history={history}>
      { routes }
    </Router>
  )
  
}
  App.propTypes = {
    history: PropTypes.object,
}



export default App;
