import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { settings, updateSettings } from '../state/actions/users'
import { get } from '../state/actions/crud'
import { Card, Avatar, Icon, Row } from 'antd'
import Navigation from '../components/navigation'
import ReactToPrint from '../components/invoiceDoc'


class DownloadPDF extends Component {
  componentWillMount = () => {
    this.props.settings()
    this.props.get(`invoice/${this.props.match.params.id}`, 'FETCHED_INVOICE')
  }

  componentWillReceiveProps (newProps) {
      this.setState({
        invoice: newProps.invoice,
        users: newProps.users
      })
  }

 render() {
   return (
      <Card bordered={false}  style={{width:"800px"}}>
        <Navigation name={`DownloadPDF: ${this.props.match.params.id}`} />
        {
          this.state && this.state.invoice
           && this.state.invoice.invoice
           && this.state.users.settings
           && this.state.users.settings.data
           &&  <ReactToPrint user={this.state.users} invoice={this.state.invoice} />
        }
      </Card>
    )
  }
}

function mapStateToProps(state, props) {
  const {users, invoice} = state
  return {users, invoice}
}

function mapDispatchToProps(dispatch) {
  return {
    settings: bindActionCreators(settings, dispatch),
      get: bindActionCreators(get, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPDF)
