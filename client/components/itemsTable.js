import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Tag } from 'antd'
import { deleteData } from '../state/actions/crud'
export const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
}

export const columns = [
  {
    title: 'QTY',
    dataIndex: 'qty'
  }, {
    title: 'Unit',
    dataIndex: 'unit',
  }, {
    title: 'Specification',
    dataIndex: 'specification',
  },
  {
   title: 'Price',
   dataIndex: 'price',
  },
  {
   title: 'Total',
   dataIndex: 'total',
  },
  {
   title: 'action',
   dataIndex: 'id',
   render: text =>
    <div>
      <span onClick={()=>deleteData(`invoice/${[text[0]]}/items/${text[1]}`)}><Icon type="delete" /></span>
    </div>
  }
];
