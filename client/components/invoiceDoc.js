import React, {Component} from "react"
import ReactToPrint from "react-to-print"
import { Table, Tag,Icon } from 'antd'
import ComponentToPrint from './invoicePrint'

class Invoice extends Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#"><Tag color="blue"  style={{margin:"10px 0 0 20px", textAlign:"right"}}>Print <Icon type="printer" /></Tag></a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint
         user={this.props.user}
         invoice={this.props.invoice}
         ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Invoice
