import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Login extends Component {
  
  state = {
    username: '',
    password: ''
  }

  loginUser = () => {
    console.log('hey')
    this.props.login(...this.state)
  }

  updateFields = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { auth, login } = this.props
    const { username, password } = this.state
    console.log('auth', auth)
    return (
      <div style={{ margin: '0 auto' }} className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h2>Login</h2>
            { auth && <span className="alert alert-danger">{auth.message}</span>}
            <input name="username"
              type="text" 
              placeholder="Username" 
              onChange={this.updateFields} 
              value={username}
              className="form form-control"/>
            <br/>
            <input name="password"
              type="password" 
              placeholder="Password" 
              onChange={this.updateFields} 
              value={password}
              className="form form-control"/>
            <br/>
            <button className='btn btn-primary' onClick={this.loginUser}>
              Submit
            </button>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  
}

export default Login
