import React, { Component } from 'react';
import './home.css';
import logo from '../assets/privy3.svg'
import icon from '../assets/icon.svg'
import location from '../assets/location.png'
import { Link, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'
import { connect } from 'react-redux'
import bell from '../assets/bell.png'
import Login from './modal/login/Login'
import down from '../assets/down-arrow.png'
import menu from '../assets/menu.png'
import search from '../assets/search.png'
import Search from '../search/Search'
import { getUserInfo, addStylistName, addZip } from '../../ducks/actions/action_creators'
import { Button, Collapse, Well, Fade, FadeDropdown, FadeItem } from 'react-bootstrap'
import CustomMenu from '../dropdown/CustomMenu'
import DropDown from '../dropdown/DropDown'
import SignUp from '../login/modal/signup/SignUp'


const homeWell = {
  position: 'absolute',
  width: '150px',
  height: '90px',
  left: '5%',
  zIndex: '10',
  fontSize: '10px',
  top: '5%',
  fontWeight: 'bold',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
  backgroundColor: 'rgba(226, 226, 226, 0.918)',
  display: 'flex',
  bordeRadius: '3px',
  overflowWrap: 'break-word',
  boxShadow: 'rgba(128, 128, 128, 0.431)',
  cursor: 'pointer',
}
const homeMenu = {
  cursor: 'pointer',
  color: 'rgb(56, 56, 56)',
  fontSize: '18px',
  textAlign: 'left',
  letterSpacing: '1px',
  textIndent: '5px',
  display: 'flex'
}


const availableTimes = {
  fontColor: 'black',
  borderStyle: 'solid',
  borderColor: 'black',
  fontSize: '12px',
  height: '50%',
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      showUser: false,
      showLoginModal: false,
      showMenu: false,
      input: '',
      full_name: this.props.userInfo.full_name,
      open: false

    }
  }

  componentDidUpdate = () => {
    axios.get('/checkSession')
      .then((res) => {
        this.props.getUserInfo(res.data)
      })
  }


  toggleModal = () => {
    this.setState(prevState => {
      return {
        showLoginModal: !prevState.showLoginModal
      }
    })
  }
  toggleSignUp = () => {
    this.setState(prevState => {
      return {
        showSignUp: !prevState.showSignUp
      }
    })
  }


  showModal = () => {
    if (this.state.showLoginModal) {
      return (
        <Login onClose={this.toggleModal} showLogin={this.state.showLoginModal} />
      )
    } else if (this.state.showSignUp) {
      return (
        <Login showSignUp={this.toggleSignUp} />
      )
    }
  }


  logout = () => {
    axios.get('/api/logout')
      .then((res) => {
        if (res.status === 200) {
          return (
            this.menu()

          )

        }
      })
  }
  menu = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open
      }
    })
  }
  dropdown = () => {
    if (this.props.userInfo !== null) {
      if (this.state.open) {
        return (
          <CustomMenu open={this.state.open} logout={this.logout} login={this.toggleModal} toggleMenu={this.menu} name={this.state.full_name} />
        )
      }
    } else {
      if (this.state.open) {
        return (
          <CustomMenu open={this.state.open} userInfo={this.props.userInfo} logout={this.logout} login={this.toggleModal} toggleMenu={this.menu} />
        )
      }
    }
  }




  render() {
    const { addStylistName, addZip } = this.props
    return (
      <div className="App">
        <header className="home-header-responsive">
          <div className='header-search-box'>
            <img src={logo} className="App-logo" alt="logo" width='170px' height='50px' />
            <div className='wrapper'>
              <input className='search-input' placeholder='Search' />
              <img src={icon} alt='icon' className='icon' width='25px' />
            </div>
          </div>

          {this.props.userInfo && this.props.userInfo.length ?
            <div className='icons-container'>
              <img className='bell' src={bell} width='30px' height='30px' />
              <div className='Fade-dropdown' >
                <Button ><img onClick={this.menu} src={down} className='down-arrow' width='15px' /></Button>
                <span className='profile-img'>{this.props.userInfo.full_name}</span>
                <div className='homeMenu'>{this.dropdown()}</div>
              </div>
            </div> :
            <React.Fragment>
              <Button id='styledButton' onClick={this.menu}><img src={menu} className='home-menu-icon' width='40px' />
                {this.dropdown()}
              </Button>
              <span className='responsive-home-title'>PrivyChic</span>
              <Link to='/search' className='search-link'><img src={search} className='search-img' /></Link>
            </React.Fragment>}
          <div className='header-search-box'>
            <img src={logo} className="App-logo" alt="logo" width='170px' height='50px' />   <div className='wrapper'>
              <input className='search-input' placeholder='Search' onChange={(e) => addZip(e.target.value)} />
              <img src={icon} alt='icon' className='icon' width='25px' />
            </div>
          </div>
          <div className='nav-link-container'>
            <span onClick={this.toggleSignUp} className='nav-link' >Sign Up</span>
            <span onClick={this.toggleModal} className='nav-link' >Login</span>
            <Link to='/business' ><button className='business'>For Business</button></Link>
            <Link to='/help' className='nav-link'><span className='nav-link'>Help</span></Link>
          </div>
        </header>
        <div className='home'>
          <div className='top-box'>
            <div className='search-box'>
              <span className='motto'> {`Discover & book beauty and barber appointments.`}</span>

              <div className='input-search-box'>
                <div className='input-container'>
                  <input onChange={(e) => addStylistName(e.target.value)} className='name' placeholder='Haircut, salon name, stylist name' />
                  <Link to='/search'> <img className='icon2' src={icon} /> </Link>
                  <input onChange={(e) => addZip(e.target.value)} placeholder='Enter city, state, or zipcode' className='location-1' />
                  <img src={location} className='location-icon' />

                </div>

                <Link to='/search' className='search'><button className='search'>Search</button></Link>
              </div>
              {this.showModal()}
              <div className='search-link-container'>Popular Searches
        <a className='search-links' href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=uWYAXLe6FtKwzwLv1LdA&q=hair+cuts&oq=hair+cuts&gs_l=img.3..0l4j0i10j0l4j0i10.5617.7012..7331...0.0..0.98.187.2......1....1..gws-wiz-img.......0i10i67j0i67.0J0ci9N9uiM'>Haircut</a>
                <a className='search-links' href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=wmYAXOOfAoOyzwLWx4iYAg&q=barber&oq=barber&gs_l=img.3..0i67l3j0j0i67l4j0j0i67.64825.66958..67110...0.0..0.105.1342.12j2......1....1..gws-wiz-img.....0..35i39j0i10i67.M1iKbUSzHmM'>Barber</a>
                <a className='search-links' href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=EWcAXOJvw-rOAv-ShfAB&q=weaves+and+extensions&oq=weaves+and+ext&gs_l=img.3.0.0j0i24l2.10882.13717..14848...0.0..1.112.1666.10j7......2....1..gws-wiz-img.....0..35i39j0i67j0i10j0i8i30.AGky8mbGUJ0'>{`Weaves & Extensions`}</a>
                <a className='search-links' href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=BmcAXPmeF82hzwK_sreQAw&q=nail&oq=nail&gs_l=img.3..35i39l2j0i67l2j0j0i67j0j0i67j0j0i67.7876.9306..9519...0.0..0.107.866.6j3......1....1..gws-wiz-img.....0.tXoBYCzVkLE'>Nails</a>
                <a className='search-links' href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=IGcAXNeLO4P6zgLn57L4AQ&q=makeup+makeover&oq=makeup+make&gs_l=img.3.1.0l10.7631.13340..15391...0.0..1.103.1226.11j2......2....1..gws-wiz-img.....0..0i67j0i8i30j35i39._VYhPAdqHY8'>Makeup</a>
                <a className='search-links' href='https://www.google.com/search?biw=1920&bih=921&tbm=isch&sa=1&ei=MWcAXIz6H8yZzwKsroqIAQ&q=hair+color&oq=hair+color&gs_l=img.3..0l9j0i67.10405.11421..11577...0.0..0.151.1009.6j4......1....1..gws-wiz-img.......35i39j0i10.KO05d_lqkT8'>Color</a>
              </div>
            </div>
            <div className='right-box'>
              <span className='bold-text'>Are you a beauty professional or barber?</span>
              <span className='booking-text'>#1 Appointment booking software for independent professionals</span>
              <Link to='/business' className='setup-link'><button className='setup'>Set Up My Business</button></Link>
              <span className='trial-text'>30 day free trial, no card required.</span>
              {this.showModal()}
            </div>
          </div>
        </div>
        <h1>{`Browse & Discover`}</h1>
        <div className='discover-box'>
          <div className='img-container'><span className='float1'>
            <span className='float-text'>Top Barbers</span>Near You</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/a-l-l-e-f-v-i-n-i-c-i-u-s-354911-unsplash.jpg' width='100%' height='100%' className='box' /></div>

          <div className='img-container'><span className='float1'>
            <span className='float-text'>Special Event</span>Look Great</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/colette-allen-480460-unsplash.jpg' width='100%' height='100%' className='box' /> </div>

          <div className='img-container'><span className='float1'><span className='float-text'>Fresh Cuts</span>Looks You'll Love</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/element5-digital-611462-unsplash.jpg' width='100%' height='100%' className='box' /> </div>

          <div className='img-container'><span className='float1'><span className='float-text'>Most Booked</span>This Week</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/fezbot2000-365718-unsplash.jpg' width='100%' height='100%' className='box' />  </div>

          <div className='img-container'><span className='float1'><span className='float-text'>Brighten Up</span> Stunning Hues Are In</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/ivan-dodig-361699-unsplash.jpg' width='100%' height='100%' className='box' /></div>

          <div className='img-container'><span className='float1'><span className='float-text'>New Stylists</span>This Week</span>
            <img src='https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b65afe192a0efba2046ab14531040e06&auto=format&fit=crop&w=634&q=80' width='100%' height='100%' className='box' /> </div>

          <div className='img-container'> <span className='float1'><span className='float-text'>Top Nail Artists</span>Near You</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/sharon-mccutcheon-666323-unsplash.jpg' width='100%' height='100%' className='box' /></div>

          <div className='img-container'><span className='float1'><span className='float-text'>Highlight Your Season</span></span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/michael-dam-258165-unsplash.jpg' width='100%' height='100%' className='box' /></div>

          <div className='img-container'><span className='float1'><span className='float-text'>Available Today</span>Near You</span>
            <img src='https://s3.us-east-2.amazonaws.com/styleseat/kal-loftus-596319-unsplash.jpg' width='100%' height='100%' className='box' />
          </div>
        </div>

      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    zipcode: state.zipcode,
    userInfo: state.userInfo,
    stylist_name: state.stylist_name

  }
}

const bindActionCreators = { getUserInfo, addStylistName, addZip }
export default withRouter(connect(mapStateToProps, bindActionCreators)(Home))
