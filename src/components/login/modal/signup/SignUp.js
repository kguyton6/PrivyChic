import React, {Component} from 'react'
import axios from 'axios'


class SignUp extends Component {
    constructor(props){
        super(props)

        this.state = {
            full_name: '',
            email: '',
            password: ''
        }
    }
registerUser = () => {
    const {full_name, email, password} = this.state
    this.setState({error: '', loading: true})


    axios.post('/api/signup', {
        full_name: full_name,
        email: email,
        password: password
    }) 
}

    render() {
        return (
            <React.Fragment>
                signup
            </React.Fragment>
        )
    }

}


export default SignUp