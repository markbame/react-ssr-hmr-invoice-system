import React, { Component } from 'react'

import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react'
import moment from 'moment'

class Example extends Component {

  render () {
    console.log("thas2", this.props)
    const {compant, address, owner, tin} = this.props.user.settings.data
    const {soldTo, date, items } = this.props.invoice.invoice
    const properties = { title: 'Invoice' }
    const columns = ["QTY", "Unit", "Specification", "Price", "Total"]

    const data = []
    let key
    if(items) {
      const itemsKeys = Object.keys(items)
      for (var i = 0; i < itemsKeys.length; i++) {
        key = itemsKeys[i]
        data.push(items[key])
      }
    }

    const rows = []
    let grandTotal = 0
    for (var i = 0; i < data.length; i++) {
      rows.push([data[i].qty, data[i].unit, data[i].specification,data[i].price, data[i].total])
      grandTotal += data[i].total
    }
    rows.push(['', '','','Grand Total', grandTotal])
      return (
        <React.Fragment>
          <PDF
            properties={properties}
            preview={true}
          >
            <Text x={70} y={25} size={20}>{ compant || 'Error: Company Name'}</Text>
            <Text x={80} y={30} size={12}>{ address || 'Error: Address'}</Text>
            <Text x={88} y={35} size={11}>{ owner || 'Error: Owner'}</Text>
            <Text x={75} y={40} size={11}>{`VAT Reg TIN : ${ tin}` || 'Error: Tin'} </Text>
            <Text x={30} y={55} size={10}>{`Sold to : ${soldTo}`}</Text>
            <Text x={30} y={60} size={10}>{`Address : ${this.props.invoice.invoice.address}`}</Text>
            <Text x={30} y={65} size={10}>{`Date : ${moment(date,"YYYY-MM-DD").format("DD-MM-YYYY")}`}</Text>
            <Table
              startY={80}
              columns={columns}
              rows={rows}
            />
            <Text x={30} y={280} size={10}>Signiture: </Text>

          </PDF>
        </React.Fragment>
      )


  }
}
export default Example
