import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
class Login extends Component {

  componentDidMount = () => {

  }

  render() {
    return (
      <div>
        {' '}
        Admin<Link to="/home">Home</Link>{' '}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
