import React, {Component} from 'react'
import {connect} from 'react-redux'
import {searchField} from '../../ducks/reducer'


class Search extends Component {
    constructor(props){
        super(props)

        this.state = {
            search: this.props.search
        }
    }
    componentWillReceiveProps(props){
        let search = this.props
        return search
    }

    render(){
        const { searchField } =  this.props
        return(
            <div className='Search'>
            <div className='home-header'>
            <p>{searchField}</p>
            <div className='main-container'>
        
            </div>
            
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

 return {
     search: state.search
 }
}


export default connect(mapStateToProps)(Search)