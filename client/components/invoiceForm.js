import React, { Component } from 'react'
import moment from 'moment'
import  { Redirect } from 'react-router-dom'
import { Form, Select, Input, Button, Tag, DatePicker, Icon } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class invoiceForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newDate = JSON.stringify(values.date)
        const newValues = { soldTo: values.soldTo, address: values.address, date: newDate}
        if(this.props.itemID) {
          this.props.update(newValues, `invoice/${this.props.itemID}`, "UPSERTED_PRODUCT")
        } else {
          this.props.create(newValues, "invoice", "UPSERTED_INVOICE")
        }
        this.setState({
          redirect: true
        })
      }
    })
  }

  componentWillMount = () => {
    this.setState({
      invoice: {}
    })
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      invoice: newProps.invoice && newProps.invoice.invoice
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form, invoice = this.props.invoice,
    currentDate = invoice && invoice.date || this.state.invoice && this.state.invoice.date || new Date().toJSON().slice(0,10).replace(/-/g,'/')
    return (
      <Form onSubmit={this.handleSubmit} style={{padding:"2px"}}>
      { this.state.redirect && this.state.invoice && this.state.invoice.key && <Redirect to={`/invoice/${this.state.invoice.key}`} /> }
        <Tag color="magenta" style={{margin:"20px"}}><Icon type="download" /> Download PDF</Tag>
        <FormItem
          label="Sold To"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('soldTo', {
            rules: [{ required: true, message: 'Please add the buyer!' }],
            initialValue: invoice && invoice.soldTo || this.state.invoice && this.state.invoice.soldTo || ''
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
            label="Address"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Please add the buyer address!' }],
              initialValue: invoice && invoice.address || this.state.invoice && this.state.invoice.address || ''
            })(
              <Input />
            )}
        </FormItem>
        <FormItem
            label="Date"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('date', {
              rules: [{ required: true, message: 'Please add the date!' }],
              initialValue: moment(currentDate, 'YYYY-MM-DD')
            })(
              <DatePicker />
            )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 5 }} >
          <Button type="primary" htmlType="submit" loading={this.props.loading}  style={{margin:"2px"}}>
            <Icon type="save" /> Save Changes
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(invoiceForm)
