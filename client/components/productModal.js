import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import ProductForm from './productForm'

class itemModal extends Component {
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

  handleClose = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" style={{margin:"5px"}} onClick={this.showModal}>
          Add Product
        </Button>
        <Modal
          closable
          title="Add Product Form"
          visible={this.state.visible}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Close</Button>
          ]}
        >
          <ProductForm
            itemID={this.props.itemID}
            create={this.props.create}
            update={this.props.update}
            handleClose={this.handleClose.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}

export default itemModal
