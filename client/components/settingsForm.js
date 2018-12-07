import React, { Component } from 'react'
import { Form, Select, Input, Button } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class settingsForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateSettings(values)
      }
    })
  }

  componentWillMount = () => {
    this.setState({
      settings: this.props.settings
    })
  }

  componentWillReceiveProps (newProps) {
      this.setState({
        settings: newProps.settings
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{padding:"20px"}}>
        <FormItem
          label="Owner"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('owner', {
            rules: [{ required: true, message: 'Please add the owner name!' }],
            initialValue: this.state.settings.owner
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
              rules: [{ required: true, message: 'Please add the address!' }],
              initialValue: this.state.settings.address
            })(
              <Input />
            )}
        </FormItem>

        <FormItem
            label="Company"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('compant', {
              rules: [{ required: true, message: 'Please add the company!' }],
              initialValue: this.state.settings.compant
            })(
              <Input />
            )}
        </FormItem>
        <FormItem
            label="Tin"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('tin', {
              rules: [{ required: true, message: 'Please add the tin number!' }],
              initialValue: this.state.settings.tin
            })(
              <Input />
            )}
        </FormItem>

        <FormItem
            label="Tax"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('tax', {
              rules: [{ required: true, message: 'Please add the tax!' }],
              initialValue: this.state.settings.tax
            })(
              <Input />
            )}
        </FormItem>

        <FormItem
            label="key"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            style={{display:'none'}}
          >
            {getFieldDecorator('key', {
              initialValue: this.state.settings.key
            })(
              <Input />
            )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit" loading={this.props.loading}>
            Update
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(settingsForm)
