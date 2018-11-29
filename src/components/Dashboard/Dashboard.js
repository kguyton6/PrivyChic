import React,  {Component} from 'react'
import axios from 'axios'
import { getUserInfo} from '../../ducks/actions/action_creators'
import {connect} from 'react-redux'
// import bindActionCreators from 'redux'

class Dashboard extends Component {
    constructor(props){
        super(props)

        this.state = {
            user: []
        }
    }

    componentDidMount = () => {
        axios.get('/checkSessions')
        .then((res) => {
            this.props.getUserInfo(res.data)
         })
        }
    
    render(){
        console.log(this.props)
        return (
            <div className='App'>
            
            Dashboard
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const {userInfo} = state
    return {
       userInfo
    }
}
const bindActionCreators = { getUserInfo }

export default connect(mapStateToProps, bindActionCreators)(Dashboard)