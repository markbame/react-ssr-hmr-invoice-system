import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { testapi } from '../state/actions/users'

class Home extends Component {

  static fetchData(store) {
    return store.dispatch(testapi());
  }

  componentWillMount = () => {

  }

  render() {
    //this.props.testapi()
    return (
      <div>
        {' '}
        Home
        <Link to="/login">Login - </Link>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    testapi: bindActionCreators(testapi, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
