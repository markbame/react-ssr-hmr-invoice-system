import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon, Tag } from 'antd'
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
    title: 'Title',
    dataIndex: 'title',
    render: text => <Tag color="magenta"><Icon type="shopping" /> {text}</Tag>,
  }, {
    title: 'Price',
    dataIndex: 'price',
    render: text => <Tag color="orange"><Icon type="dollar" /> {text}</Tag>
  },
    {
     title: 'Unit',
     dataIndex: 'unit',
     render: text => <Tag color="orange"><Icon type="unit" /> {text}</Tag>
   },
  {
   title: 'Action',
   dataIndex: 'id',
   render: text =>
    <div>
      <Link to={`/product/${text}`}><Icon type="form" /></Link><Divider type="vertical" />
      <span onClick={()=>deleteData(`products/${text}`)} style={{color:"#1890ff", cursor:'pointer'}}><Icon type="delete" /></span>
    </div>,
  }];
