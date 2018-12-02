import React,  {Component} from 'react'
import axios from 'axios'
import { getUserInfo, addAppointment} from '../../ducks/actions/action_creators'
import {connect} from 'react-redux'
import './dashboard.css'

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

         },
         axios.get('/api/appointments')
         .then((res) => {
             this.props.addAppointment(res.data)
         })
         )
        }

        appointments = () => {
            let appointment = this.props.appointment
            if(this.props.appointment){
            console.log(appointment)
                return (
                    <div className='appointments'>
                    <li>{appointment[0].month_name}</li>
                    <li>{appointment[0].day}</li>
                    <li>{appointment[0].year}</li>
                    <li>{appointment[0].time}</li>
                    </div>
                    )     
        } else {
            return (
                <div>No Appointments Booked</div>
            )
        }
    }
    
    render(){
        console.log(this.props, this.props.appointment)
        return (

            this.props.getUserInfo.user_type === 'business' ?
            <div className='App'>
                <div className='dashboard-header'>

                </div>
            </div> :
            <div className='App'>
            <div className='dashboard-header'>
            </div>
                {this.appointments()}
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    const {userInfo, appointment} = state
    return {
       userInfo,
       appointment
    }
}
const bindActionCreators = { getUserInfo, addAppointment }

export default connect(mapStateToProps, bindActionCreators)(Dashboard)