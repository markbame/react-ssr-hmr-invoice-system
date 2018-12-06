import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import InvoiceForm from './invoiceForm'

class invoiceModal extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  componentWillReceiveProps (newProps) {
      this.setState({
        invoice: newProps.invoice
      })
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={{margin:'5px'}}>
          Create New Invoice
        </Button>
        <Modal
          title="Create Invoice Form"
          visible={this.state.visible}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Close</Button>
          ]}
        >
          <InvoiceForm
            create={this.props.create}
            update={this.props.update}
            list={this.props.list}
            invoice={this.state.invoice}
            itemID={this.state.itemID}
          />
        </Modal>
      </div>
    );
  }
}

export default invoiceModal
