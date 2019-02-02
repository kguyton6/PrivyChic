import React, { Component } from 'react'
import axios from 'axios'
import { addAppointment } from '../../ducks/actions/action_creators'
import { connect } from 'react-redux'
import './dashboard.css'
import Header from '../Header'
import { withRouter} from 'react-router'
import styled from 'styled-components'


const Main = styled.main`
    height: 30vh;
    width: 60%;
    margin-top: 10%;
    border: #06D8CC thin solid;
    font-size: 1rem;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;

`

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: [],
            calendar_id: null,
            client_id: null,
            open: false,
            name: 'User',
            time: [],
            id: null,
            showLogin: false
        }
    }

    componentDidMount = () => {
                axios.get(`/api/appointments/${this.props.match.params.id}`)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data[0]) {
                            this.setState({ time: res.data, id: res.data[0].id })

                        } else {
                            return false
                        }
                    })
                }

    cancel = () => {
        axios.delete(`/api/delete/appointment/${this.state.id}`)
            .then((res) => {
                if (res.data === 'success') {
                    return this.componentDidMount()
                }
            })
    }

   
    appointments = () => {
        if (this.state.time) {
            let appointment = this.state.time
            let time = []
            for (let i in appointment) {
                time.push(
                    <div key={i} className='appointments'>
                        <li>{appointment[0].month_name}</li>
                        <li>{appointment[0].day}</li>
                        <li>{appointment[0].year}</li>
                        <li>{appointment[0].time}</li>
                        <button className='cancel' onClick={this.cancel}>Cancel</button>
                    </div>

                )
                return time
            }
        } else {
            return (
                <div>No Appointments Booked</div>
            )
        }
    }

   
    render() {
        console.log(this.props)
        return (

            <div  >
               <Header />
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <Main >
                    <span className='user-title'>{`${this.props.user.full_name}'s Appointments`}</span>
                    {this.appointments()}
                </Main>
                    </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { user, appointment } = state
    return {user,  appointment }
}

export default withRouter(connect(mapStateToProps,{ addAppointment })(Dashboard))