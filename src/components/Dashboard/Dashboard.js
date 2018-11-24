import React,  {Component} from 'react'
import axios from 'axios'


class Dashboard extends Component {
    constructor(props){
        super(props)

        this.state = {
            user: []
        }
    }

    componentDidMount = () => {
        axios.get('/api/getbusiness')
        .then((res) => {
            console.log(res.data)
            this.setState({user: res.data})
        })
    }
    render(){
        return (
            <div className='App'>
            
            Dashboard
            </div>
        )
    }
}

export default Dashboard