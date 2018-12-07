import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { settings } from '../state/actions/users'
import { Menu, Icon, Card, Divider, Table, Button, Tag } from 'antd'
import Navigation from '../components/navigation'
import InvoiceForm from '../components/invoiceForm'
import {rowSelection, columns} from '../components/itemsTable'
import ItemModal from '../components/itemModal'
import { update, list, get, create } from '../state/actions/crud'

class Invoice extends Component {
  componentWillMount = () => {
      const {id} = this.props.match.params
      this.props.get(`invoice/${id}`, 'FETCHED_INVOICE')
  }

  componentWillReceiveProps (newProps) {
    const invoiceItems = newProps.invoice && newProps.invoice.invoice && newProps.invoice.invoice.items || []
    if(invoiceItems) {
      this.setState({
        invoice: newProps.invoice,
        items: invoiceItems
      })
    }
  }

   render() {
     const invoiceItems = this.state && this.state.items || []
     let data = [], key = [], total = 0
     const keys = Object.keys(invoiceItems)
     for (var i = 0; i < keys.length; i++) {
       key = keys[i]
       total += parseFloat(invoiceItems[key].total)
       data.push({...invoiceItems[key], key, id: [this.props.match.params.id, key]})
     }
    return (
      <Card bordered={false}  style={{width:"800px"}}>
        <Navigation name={'Invoice'} />
        <InvoiceForm
            invoice={this.props.invoice}
            create={this.props.create}
            update={this.props.update}
            itemID={this.props.match.params.id}
            products={this.props.products}
         />
        <Divider>Items</Divider>
        <ItemModal
          create={this.props.create}
          list={this.props.list}
          update={this.props.update}
          itemID={this.props.match.params.id}
          prodState={this.props.products}
         />
         <Tag color="green" style={{margin:"10px", float:"right"}}> Grand Total: {total}</Tag>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small" />
      </Card>
    )
  }
}

function mapStateToProps(state, props) {
  const { invoice, item, products } = state
  return { invoice, item, products }
}

function mapDispatchToProps(dispatch) {
  return {
    update: bindActionCreators(update, dispatch),
    create: bindActionCreators(create, dispatch),
    list: bindActionCreators(list, dispatch),
    get: bindActionCreators(get, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
