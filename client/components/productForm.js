import React, { Component } from 'react'
import moment from 'moment'
import  { Redirect } from 'react-router-dom'
import { Form, Select, Input, Button, Tag, DatePicker, Icon, Checkbox } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class productForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.props.create) {
          this.props.create(values, `products`, "UPSERTED_PRODUCT")
          this.props.handleClose()
        } else {
          this.props.update(values, `products/${this.props.id}`, "UPSERTED_PRODUCT")
          this.setState({
            redirect: true
          })
        }
      }
    })
  }

  componentWillReceiveProps (newProps) {
      this.setState({
        product: newProps.product && newProps.product
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{padding:"2px"}}>
      <Tag color="magenta" style={{margin:"20px"}}><Icon type="shopping" /> Update Product</Tag>

      { this.state && this.state.redirect && <Redirect to={`/products`} /> }
      <FormItem
          label="Title"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please add the title!' }],
            initialValue: this.state && this.state.product && this.state.product.title || ''
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
            initialValue: this.state && this.state.product && this.state.product.price || 1
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
              initialValue:  this.state && this.state.product && this.state.product.unit || 'pcs'
            })(
              <Input />
            )}
        </FormItem>
        <FormItem label="Taxable"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}>
          {getFieldDecorator('taxable', {
            valuePropName: 'checked',
            initialValue: this.state && this.state.product && this.state.product.taxable?true:false
          })(
            <Checkbox/>
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 5 }} >
          <Button type="primary" htmlType="submit" loading={this.props.loading}  style={{margin:"2px"}}>
            Save
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(productForm)
