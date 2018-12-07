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
    console.log("nep orp", newProps.state)
    if(newProps.state.invoice && newProps.state.invoice.invoices) {
      this.setState({
        invoice: newProps.state.invoice,
        buyers: this.getBuyers( newProps.state.invoice.invoices)
      })
    }

  }

  componentWillMount = () => {
      this.props.list(`invoice`, 'FETCHED_INVOICES')
  }

  getBuyers = (invoices) => {
    console.log('inv', invoices)
    const buyers = []
    for (var i = 0; i < invoices.length; i++) {
      buyers.push({...invoices[i].buyer, id: invoices[i].id, key: invoices[i].key})
    }
    return buyers
  }

   render() {

     console.log('buyers', this.state && this.state.buyers)
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
          dataSource={this.state && this.state.buyers}
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
