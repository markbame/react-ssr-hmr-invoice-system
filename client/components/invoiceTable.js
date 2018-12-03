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
    title: 'Sold To',
    dataIndex: 'soldTo',
    render: text => <Tag color="magenta"><Icon type="user" /> {text}</Tag>,
  }, {
    title: 'Date',
    dataIndex: 'date',
    render: text => <Tag color="red"><Icon type="calendar" /> {text}</Tag>,
  }, {
    title: 'Address',
    dataIndex: 'address',
    render: text => <Tag color="orange"><Icon type="home" /> {text}</Tag>
  },
  {
   title: 'Action',
   dataIndex: 'id',
   render: text =>
    <div>
      <Link to={`/invoice/${text}`}><Icon type="form" /></Link><Divider type="vertical" />
      <span onClick={()=>deleteData(`invoice/${[text]}`)} style={{color:"#1890ff", cursor:'pointer'}}><Icon type="delete" /></span><Divider type="vertical" />
      <Link to={`/invoice-download/${text}`}><Icon type="download" /></Link>
    </div>,
  }];
