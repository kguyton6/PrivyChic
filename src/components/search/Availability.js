import React, {Component} from 'react'
import axios from 'axios'
import Griddle from 'griddle-react'





class Availability extends Component {
    constructor(props){
        super(props)

        this.state = {
            availability: []
        }
    }

   

//
    
    render(){
        let  { data } = this.props.data
        console.log(this.props)
        return (
<div className='availablility'>
        {/* {this.availability()} */}
        <Griddle data={data} />
        </div>


        )
    }
}

export default Availability