import React from 'react';
import axios from 'axios';

class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname : '',
      email : '',
      temperature : '',
      phonenumber : ''
    }

    this.onValueChange = this.onValueChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }


  onValueChange(e){
    this.setState({
      [e.target.dataset.name] : e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault()

    const health = {
      fullname: this.state.fullname,
      email: this.state.email,
      temperature: this.state.temperature,
      phonenumber: this.state.phonenumber
    }


    axios.post('http://localhost:5000/health/add', health)
              .then(res => console.log(res.data))
              .catch(err => console.log("Error:" + err))

    
  }

  render(){
      return (
    <>
      <div>Create List</div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Full Name</label>
            <input type="text" onChange={this.onValueChange} data-name="fullname" required/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" onChange={this.onValueChange} data-name="email" required/>
          </div>
          <div>
            <label>Temperature</label>
            <input type="number" step="0.1" onChange={this.onValueChange} data-name="temperature" required/>
          </div>
          <div>
            <label>Phone Number</label>
            <input type="tel" onChange={this.onValueChange} data-name="phonenumber" required/>
          </div>
          <button className='bg-sky-800 p-2' type='submit'>Submit</button>
       </form>
    </>
  )
  }

}

export default Create