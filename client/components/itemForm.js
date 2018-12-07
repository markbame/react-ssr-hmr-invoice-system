import React, { Component } from 'react'
import moment from 'moment'
import { Form, Select, Input, Button, Tag, DatePicker, Checkbox } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import {list} from '../state/actions/crud'

class itemForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const total = parseFloat(values.qty) * parseFloat(values.price)
        const newValues = {...values, total}
        this.props.create(newValues, `invoice/${this.props.itemID}/items`, "UPSERTED_ITEM")
        this.props.handleClose()
        this.props.form.resetFields()
      }
    })
  }

  componentWillMount = () => {
      this.props.list(`products`, 'FETCHED_PRODUCTS')
  }

  handleChange (value, options) {
    if(value) {
      const productData = JSON.parse(options.key)
      this.setState({
        price: productData.price,
        unit: productData.unit,
        taxable: productData.taxable,
      })
    }
  }

  componentWillReceiveProps (newProps) {
    if(newProps != this.props) {
      this.setState({
        products: newProps.prodState && newProps.prodState.products
      })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{padding:"2px"}}>
      <FormItem
          label="Name"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('specification', {
          })(
            <Select style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
              { this.state &&  this.state.products.map(function(product){
                 return <Option value={product.title} key={JSON.stringify({
                   key: product.key,
                   price: product.price,
                   unit:product.unit,
                   taxable:product.taxable})}
                   >
                   {product.title}
                </Option>
              }) }
            </Select>
          )}
      </FormItem>
        <FormItem
          label="QTY"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('qty', {
            rules: [{ required: true, message: 'Please add the quantity!' }],
            initialValue:  1
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
            label="Unit"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('unit', {
              rules: [{ required: true, message: 'Please add the unit!' }],
              initialValue: this.state && this.state.unit || 'pcs'
            })(
              <Input />
            )}
        </FormItem>
        <FormItem
            label="Price"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('price', {
              rules: [{ required: true, message: 'Please add the price!' }],
              initialValue: this.state && this.state.price || 0
            })(
              <Input />
            )}
        </FormItem>
        <FormItem
            label="Taxable"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('taxable', {
              valuePropName: 'checked',
              initialValue: this.state && this.state.taxable?true:false
            })(
              <Checkbox />
            )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 5 }} >
          <Button type="primary" htmlType="submit" loading={this.props.loading}  style={{margin:"2px"}}>
            Add to list
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(itemForm)
