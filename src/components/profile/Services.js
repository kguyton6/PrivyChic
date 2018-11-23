import React, {Component} from 'react'
import axios from 'axios';
import './profile.css'
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';

const sortProperties = [
    { id: 'price', sortAscending: true }
  ];
  

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

    render(){
        var data = this.state.services
        console.log(data)
        return (

           <React.Fragment>
            <Griddle 
            data={data} 
            plugins={[plugins.LocalPlugin]}
            sortProperties={sortProperties}>
            <RowDefinition width={500}>
      <ColumnDefinition id="type" title="Type" />
      <ColumnDefinition id="service_name" title="Service" order={1} width={300} />
      <ColumnDefinition id="price" title="Price" width={400}/>
      <ColumnDefinition id="duration" title="Duration" />
    </RowDefinition>
            </Griddle>
           </React.Fragment>


        )
    }
}
export default Services