import React, {Component} from "react"
import { Table, Tag,Icon } from 'antd'
import moment from 'moment'

const columns = [
{
  title: 'QTY',
  dataIndex: 'qty',
  key: 'qty',
}, {
  title: 'Specification',
  dataIndex: 'specification',
  key: 'specification',
}, {
  title: 'Price',
  dataIndex: 'price',
  key: 'price',
},{
  title: 'Total',
  dataIndex: 'total',
  key: 'total',
}]

 class ComponentToPrint extends Component {
   render() {
    const { soldTo, date, items } = this.props.invoice.invoice
    const {compant, address, owner, tin, tax} = this.props.user.settings.data
    const data = []
    let key, total=0, totalTaxable=0
    if(items) {
      const itemsKeys = Object.keys(items)
      for (var i = 0; i < itemsKeys.length; i++) {
        key = itemsKeys[i]
        total+=items[key].total
        if(items[key].taxable) {
          totalTaxable +=items[key].total
        }
        data.push(items[key])
      }
    }
    data.push({qty:'',specification:'',price:'Total Sales (VAT inclusive)',total:totalTaxable})
    data.push({qty:'',specification:'',price:'Less VAT',total:(totalTaxable*tax/100)})
    data.push({qty:'',specification:'',price:'Amount Net of VAT',total:(Math.round(totalTaxable/(1+(tax/100))))})
    data.push({qty:'',specification:'',price:'VAT Exempt Sales',total:total-totalTaxable})
    data.push({qty:'',specification:'',price:'Grand Total',total})
    return (
      <div>
        <h2 key={compant} style={{margin:"1px",marginTop:"60px", "textAlign":"center"}}>{compant}</h2>
        <h4 key={owner} style={{margin:"1px", "textAlign":"center"}}>{owner}</h4>
        <h4 key={address} style={{margin:"1px", "textAlign":"center"}}>{address}</h4>
        <h4 key={tin} style={{margin:"1px", "textAlign":"center"}}>VAT Reg TIN: {tin}</h4>
        <h4 style={{marginLeft:"30px",marginTop:"30px", "textAlign":"left"}}><span style={{ fontWeight:'bold' }}>SOLD TO:</span> {soldTo}</h4>
        <h4 style={{marginLeft:"30px",marginTop:"5px", "textAlign":"left"}}><span style={{ fontWeight:'bold' }}>ADDRESS:</span> {address}</h4>
        <h4 style={{marginLeft:"30px",marginTop:"5px", "textAlign":"left"}}><span style={{ fontWeight:'bold' }}>DATE:</span> {moment(date,"YYYY-MM-DD").format("DD-MM-YYYY")}</h4>
        <Table style={{margin:"30px"}}
          dataSource={data}
          pagination={false}
          columns={columns} />
        <h4 key={12} style={{marginLeft:"30px", "textAlign":"left", fontWeight:"bold"}}>Signiture:</h4>
      </div>
    )
  }
}
export default ComponentToPrint
