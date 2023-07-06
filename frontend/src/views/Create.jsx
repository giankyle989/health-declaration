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
      <div className='flex justify-center items-center bg-slate-300 p-4 mx-10'>
        <form className='flex flex-col items-center gap-2' onSubmit={this.onSubmit}>
            <div>
              <input className='p-2 border-2 border-black active:outline-none' type="text" onChange={this.onValueChange} data-name="fullname" placeholder='Fullname' required/>
            </div>
            <div>
              <input className='p-2 border-2 border-black active:outline-none' type="email" onChange={this.onValueChange} data-name="email" placeholder='Email' required/>
            </div>
            <div>
              <input className='p-2 border-2 border-black active:outline-none' type="number" step="0.1" onChange={this.onValueChange} data-name="temperature" placeholder='Temperature' required/>
            </div>
            <div>
              <input className='p-2 border-2 border-black active:outline-none' type="tel" onChange={this.onValueChange} data-name="phonenumber" placeholder='Phone Number' required/>
            </div>
            <button className='bg-sky-500 p-2' type='submit'>Submit</button>
        </form>
      </div>
        
    </>
  )
  }

}

export default Create