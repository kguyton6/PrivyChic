import React,  {Component} from 'react'
import axios from 'axios'
import { getUserInfo, addAppointment} from '../../ducks/actions/action_creators'
import {connect} from 'react-redux'
import './dashboard.css'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {addZip} from  '../../ducks/actions/action_creators'
import logo from '../assets/Artboard1.png'
import menu from '../assets/menu.png'
import search from '../assets/search.png'
import icon from '../assets/icon.svg'
import CustomMenu from '../dropdown/CustomMenu';
import Login from '../login/modal/login/Login'
import DropDown from '../dropdown/DropDown'


class Dashboard extends Component {
    constructor(props){
        super(props)

        this.state = {
            user: [],
            calendar_id: null,
            client_id: null,
            open: false,
            name: 'User',
            appointment: []
        }
    }

    componentDidMount = () => {
        axios.get('/checkSession')
        .then((res) => {
            console.log(res.data)
            this.props.getUserInfo(res.data)
            this.setState({name: this.props.userInfo.full_name})
   
        },
        axios.get(`/api/appointments/${this.props.match.params.id}`)
        .then((res) => {
            console.log(res)
          this.setState({appointment: res.data})
             
        }))
    }
        cancel = () => {
            axios.delete(`/api/delete/appointment/${this.props.id}`)
            .then((res) => {
                if(res.status === 200){
                return this.componentDidMount()
                }
            })
        }
        open = () => {
            this.setState(prevState => {
                return {
                    open: !prevState.open
                }
            })
        }

        logout = () => {
            axios.get('/api/logout')
            .then(() => {
                this.props.history.push('/')
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
            if(this.state.appointment){
            let appointment = this.state.appointment
            let time = []
            for(let i in appointment){
                time.push(
                    <div className='appointments'>                   
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
        if(this.state.login){
            return (
                <Login showLogin ={this.state.login} />
            
            )
        }
    }
    dropdown = () => {
        if(this.state.open) {
            return (
                <CustomMenu open={this.state.open} login={this.state.showLogin} />
            )
        }
    }
    
    render(){
        console.log(this.props, this.props.appointment, this.state.user_id, this.state.calendar_id)
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
    const {userInfo, appointment} = state
    return {
       userInfo,
       appointment
    }
}
const bindActionCreators = { getUserInfo, addAppointment }

export default connect(mapStateToProps, bindActionCreators)(Dashboard)