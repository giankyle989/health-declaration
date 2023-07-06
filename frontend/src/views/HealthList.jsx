import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Health = props => {
  return(
    <tr>
      <td>{props.health.fullname}</td>
      <td>{props.health.temperature}</td>
      <td>{props.health.email}</td>
      <td>{props.health.phonenumber}</td>
      <td>
      <Link to={'/edit' + props.health._id}>Edit</Link>
      <a href="#" onClick={(() => {props.deleteHealth(props.health._id)})}>Delete</a>
      </td>
    </tr>


  )
}

export default class HealthList extends Component {
  constructor(props){
    super(props)
    this.state = {health: []}

    this.deleteHealth = this.deleteHealth.bind(this)
  }

  componentDidMount(){
    axios.get('http://localhost:5000/health/')
          .then(res => {
            this.setState({health: res.data})
          })
          .catch(error => {
            console.log(error)
          })
  }

  deleteHealth(id){
    axios.delete('http://localhost:5000/health/'+ id)
          .then(res => console.log(res.data))
          this.setState({
            health: this.state.health.filter(el => el._id !== id)
          })
  }

  healthDeclaration(){
    return this.state.health.map(currentHealth => {
      return <Health health={currentHealth} deleteHealth={this.deleteHealth} key={currentHealth._id}/>
    })
  }

  render() {
    return (
      <>
      <h1>Health List</h1>
      
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Temperature</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>{this.healthDeclaration()}</tbody>
      </table>
      </>
    )
  }
}
