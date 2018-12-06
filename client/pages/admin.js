import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { settings, updateSettings } from '../state/actions/users'
import Navigation from '../components/navigation'
import SettingsForm from '../components/settingsForm'
import { Card, Spin } from 'antd'

class Admin extends Component {
  static fetchData(store) {
    return store.dispatch(settings());
  }

  componentWillMount = () => {
    this.props.settings()
  }

  componentWillReceiveProps (newProps) {
      this.setState({
        updateSettings:  newProps.state.users && newProps.state.users.settings.data
      })
  }

  render() {
    return (
      <Card bordered={false} style={{width:"800px"}}>
        <Navigation name={'Settings'}/>
        <SettingsForm
          loading={this.props.state.users.loading}
          updateSettings={this.props.updateSettings}
          settings={this.state && this.state.updateSettings || {}}/>
      </Card>
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
    settings: bindActionCreators(settings, dispatch),
    updateSettings: bindActionCreators(updateSettings, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
