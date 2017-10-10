import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import client from '../client.js'
import {Input, Button} from 'semantic-ui-react'

class Login extends Component {
  state = {
    fields: {
      name: '',
      password: '',
      errorMessage: ''
    },
    loginStatus: null
  }

  handleChange = (e) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    client.login(this.state.fields)
      .then(() => {
        this.setState({
          fields: {
            name: '',
            password: '',
            errorMessage: ''
          },
          loginStatus: 'success'
        })
      }).catch((err) => {
        this.setState({
          loginStatus: 'fail',
          errorMessage: err
        })
      })
  }
  
  render() {
    const from = this.props.location.state && this.props.location.state.from && this.props.location.state.from.pathname
    return (
      <div>
        {this.state.loginStatus === 'success' && (<Redirect to={from || '/albums'} />)}
        <form onSubmit={this.handleSubmit} >
          <Input type='text' name='name' placeholder='name' value={this.state.fields.name} onChange={this.handleChange} />
          <Input type='text' name='password' placeholder='password' value={this.state.fields.password} onChange={this.handleChange} />
          <Button color='blue' type='submit'>Login</Button><br/>
          {this.state.loginStatus === 'fail' && (<span style={{color: 'red'}} >{this.state.errorMessage}</span>)}
        </form>
      </div> 
    )
  }
}

export default Login