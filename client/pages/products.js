import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { settings } from '../state/actions/users'
import { Menu, Icon, Card, Divider, Table, Button, Tag } from 'antd'
import Navigation from '../components/navigation'
import InvoiceForm from '../components/invoiceForm'
import {rowSelection, columns} from '../components/productsTable'
import ProductModal from '../components/productModal'
import { update, list, get, create } from '../state/actions/crud'

class Products extends Component {
  static fetchData(store) {
    return store.dispatch(list(`products`, 'FETCHED_PRODUCTS'))
  }

  componentWillMount = () => {
    this.props.list(`products`, 'FETCHED_PRODUCTS')
  }

  componentWillReceiveProps (newProps) {
      this.setState({
        products: newProps.state.products && newProps.state.products.products
      })
  }

   render() {
     const data = this.state && this.state.products|| []

    return (
      <Card bordered={false}  style={{width:"800px"}}>
        <Navigation name={'Products'} />
        <ProductModal
          create={this.props.create}
          product={this.state && this.state.product}
        />
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
  return { state }
}

function mapDispatchToProps(dispatch) {
  return {
    update: bindActionCreators(update, dispatch),
    create: bindActionCreators(create, dispatch),
    list: bindActionCreators(list, dispatch),
    get: bindActionCreators(get, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
