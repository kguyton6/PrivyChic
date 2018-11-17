// import React, {Component} from 'react'
// import axios from 'axios';




// class Profile extends Component {
//     constructor(props){
//         super(props)

//         this.state = {
//             profile: [],
//             id: null
//         }
//     }
//     componentWillReceiveProps(){
//         this.setState({id: this.props.business_id})

//     }

//     componentDidMount = () => {
//         axios.get(`/api/profile/${this.props.match.params.id}`)
//         .then((res) => {
//             console.log(res)
//             this.setState({profile: []})
//         })
//     }

//     showProfile = () => {
//         let profile = this.state.profile
//         let stylist = []
//         for(let i in profile) {
//             stylist.push(
//                 <div className='Profile'>
//                 <h1 className='stylist-name'>{`${profile[i].first_name} ${profile[i].last_name}`}</h1>
//                 <div className='profile-main-container'>
                
//                 </div>
                
                
//                 </div>


//             )
//         }
//     }

//     render(){
//         console.log(this.state)
//         return (
//             <div> Profile</div>
          
//         )
//     }
// }


// export default Profile