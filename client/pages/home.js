import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { settings, updateSettings } from '../state/actions/users'
import { Card, Avatar, Icon, Row } from 'antd'
import Navigation from '../components/navigation'

class Home extends Component {

  static fetchData(store) {
    return store.dispatch(settings());
  }

  componentWillMount = () => {
    this.props.settings()
    this.setState({
      settings: this.props.users.settings && this.props.users.settings.data
    })
  }

   render() {
    return (
      <Card bordered={false}  style={{width:"800px"}}>
        <Navigation name={'Home'} />
        <Row>
          <Icon type="user" style={{margin:'10px'}}/>
          {this.state && this.state.settings && this.state.settings.owner}
        </Row>
        <Row>
          <Icon type="shop" style={{margin:'10px'}} />
          {this.state && this.state.settings && this.state.settings.compant}
        </Row>
        <Row>
          <Icon type="home" style={{margin:'10px'}} />
          {this.state && this.state.settings && this.state.settings.address}
        </Row>
      </Card>
    )
  }
}

function mapStateToProps(state, props) {
  const {users} = state
  return {users}
}

function mapDispatchToProps(dispatch) {
  return {
    settings: bindActionCreators(settings, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
