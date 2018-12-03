import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { create, update, list } from '../state/actions/crud'
import { Menu, Icon, Card } from 'antd'
import Navigation from '../components/navigation'
import {rowSelection, columns} from '../components/invoiceTable'
import InvoiceModal from '../components/invoiceModal'
import { Table } from 'antd'
import axios from 'axios'

class Invoices extends Component {

  static fetchData(store) {
    return store.dispatch(list(`invoice`, 'FETCHED_INVOICES'));
  }

  componentWillReceiveProps (newProps) {
      this.setState({
        invoice: newProps.state.invoice
      })
  }

  componentWillMount = () => {
      this.props.list(`invoice`, 'FETCHED_INVOICES')
  }

   render() {
    return (
      <Card bordered={false}  style={{width:"1300px"}}>
        <Navigation name={'Invoices'} />
        <InvoiceModal
          create={this.props.create}
          update={this.props.update}
          invoice={this.state && this.state.invoice}
        />
        <Table
          bordered
          pagination={false}
          columns={columns}
          dataSource={this.props.state.invoice.invoices}
          size="small" />
      </Card>
    )
  }
}

function mapStateToProps(state, props) {
  return {state}
}

function mapDispatchToProps(dispatch) {
  return {
    create: bindActionCreators(create, dispatch),
    update: bindActionCreators(update, dispatch),
    list: bindActionCreators(list, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices)
