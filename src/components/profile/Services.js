import React, {Component} from 'react'
import axios from 'axios';
import './profile.css'
import Griddle from 'griddle-react';



class Services extends Component {
    constructor(props){
        super(props)

        this.state = {
            services: [],

        }
    }

        componentDidMount = () => {
             axios.get(`/api/services/${this.props.id}`)
             .then((res) => {
                 this.setState({services: res.data})
             })
        }

    // showServices = () => {
    //     let services = this.state.services
    //     let service = []

    //     for(let i in services){
    //         service.push(
    //             <ul>
    //                 <li key={i}>{services[i]}</li>
    //                 <li>{services[i]} and up to {services[i]}</li>
    //             </ul>
    //         )
    //        return service
    //     }

    // }
    render(){
        var data = this.state.services
        console.log(data)
        return (

           <React.Fragment>
            <Griddle data={data} />
           </React.Fragment>


        )
    }
}
export default Services