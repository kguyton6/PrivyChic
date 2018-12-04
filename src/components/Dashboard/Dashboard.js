import React, { Component } from 'react'
import axios from 'axios'
import { getUserInfo, addAppointment } from '../../ducks/actions/action_creators'
import { connect } from 'react-redux'
import './dashboard.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { addZip } from '../../ducks/actions/action_creators'
import logo from '../assets/Artboard1.png'
import menu from '../assets/menu.png'
import search from '../assets/search.png'
import icon from '../assets/icon.svg'
import CustomMenu from '../dropdown/CustomMenu';
import Login from '../login/modal/login/Login'
import DropDown from '../dropdown/DropDown'
import { withRouter} from 'react-router'


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
        axios.get('/checkSession')
            .then((res) => {
                console.log(res.data)
                this.props.getUserInfo(res.data)
                this.setState({ name: this.props.userInfo.full_name, client_id: this.props.userInfo.user_id })

            },
                axios.get(`/api/appointments/${this.props.match.params.id}`)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data[0]) {
                            this.setState({ time: res.data, id: res.data[0].id })

                        } else {
                            return false
                        }
                    }))
    }
    cancel = () => {
        axios.delete(`/api/delete/appointment/${this.state.id}`)
            .then((res) => {
                if (res.data === 'success') {
                    return this.componentDidMount()
                }
            })
    }

    logout = () => {
        axios.get('/api/logout')
            .then(() => {
            return this.props.history.push('/')
            })
    }
    menu = () => {
        this.setState(prevState => {
            return {
                open: !prevState.open
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

    login = () => {
        if (this.state.showLogin) {
            return (
                <Login showLogin={this.state.login} />

            )
        }
    }
    dropdown = () => {
        if (this.state.open) {
            return (
                <CustomMenu menu={this.state.open} logout={this.logout} />
            )
        }
    }

    render() {
        console.log(this.state.user_id, this.state.calendar_id)
        return (

            <div className='App'>
                <header className="dashboard-header-responsive">
                    <div className='dashboard-menu'>
                        <Button onClick={this.menu}><img src={menu} className='dashboard-menu-icon' width='40px' />
                            {this.dropdown()}
                        </Button>
                    </div>
                    <span className='responsive-dashboard-title'>PrivyChic</span>
                    <Link to='/search' className='dashboard-search-link'><img src={search} className='dashboard-search-img' /></Link>

                    <div className='header-dashboard-box'>
                        <img src={logo} className="App-logo" alt="logo" width='170px' height='50px' />
                    </div>
                    <div className='nav-link-container'>
                        <span onClick={this.toggleSignUp} className='nav-link' >Sign Up</span>
                        <span onClick={this.toggleModal} className='nav-link' >Login</span>
                        <Link to='/business' ><button className='business'>For Business</button></Link>
                        <Link to='/help' className='nav-link'><span className='nav-link'>Help</span></Link>
                    </div>
                </header>




                {/* <div className='header-search-box'>
              <img src={logo} className="App-logo" alt="logo" width='170px' height='50px' />   <div className='wrapper'>
                <input className='search-input' placeholder='Search' onChange={(e) => addZip(e.target.value)} />
                <img src={icon} alt='icon' className='icon' width='25px' />
              </div>
            <div className='nav-link-container'>
              <span onClick={this.toggleSignUp} className='nav-link' >Sign Up</span>
              <span onClick={this.toggleModal} className='nav-link' >Login</span>
              <Link to='/business' ><button className='business'>For Business</button></Link>
              <Link to='/help' className='nav-link'><span className='nav-link'>Help</span></Link>
            </div>
        </div>  */}


                <div className='dashboard-main-box'>
                    <span className='user-title'>{`${this.props.userInfo.full_name}'s Appointments`}</span>
                    {this.appointments()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { userInfo, appointment } = state
    return {
        userInfo,
        appointment
    }
}
const bindActionCreators = { getUserInfo, addAppointment }

export default withRouter(connect(mapStateToProps, bindActionCreators)(Dashboard))