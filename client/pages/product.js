import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { settings } from '../state/actions/users'
import { Menu, Icon, Card, Divider, Table, Button, Tag } from 'antd'
import Navigation from '../components/navigation'
import ProductForm from '../components/productForm'
import {rowSelection, columns} from '../components/itemsTable'
import ItemModal from '../components/itemModal'
import { update, list, get, create } from '../state/actions/crud'

class Product extends Component {

  static fetchData(store) {
    return store.dispatch(this.props.get(`products/${this.props.match.params.id}`, 'FETCHED_PRODUCT'))
  }

  componentWillMount = () => {
      this.props.get(`products/${this.props.match.params.id}`, 'FETCHED_PRODUCT')
  }

  componentWillReceiveProps (newProps) {
      this.setState({
        product: newProps.state.products && newProps.state.products.product
      })
  }

   render() {
    return (
      <Card bordered={false}  style={{width:"800px"}}>
        <Navigation name={'Product'} />
        <ProductForm
          product={this.state && this.state.product || ''}
          update={this.props.update}
          id={this.props.match.params.id}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Product)
