import React, { Component } from 'react';
import { Table, Button, Modal, Input } from 'antd';
import { connect } from 'dva';
import LocalizedModal from './LocalizedModal';

const { Search } = Input;

@connect(({ userManagement, loading }) => ({
  filterData: userManagement.filterData,
  loading: loading.effects['userManagement/fetchAllUsers'],
}))
class TableList extends Component {
  // 表头数据
  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '角色',
      dataIndex: 'authority',
      width: 300,
    },
    {
      title: '操作',
      key: 'action',
      width: 400,
      render: (text, record) => (
        <span>
          <LocalizedModal text="Edit" data={record} />
          <Button onClick={() => this.lockConfirm(record.key)}>Lock</Button>
          <Button type="danger" onClick={() => this.deleteConfirm(record.key)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    // 获取用户数据
    dispatch({ type: 'userManagement/fetchAllUsers' });
  }

  lockConfirm = key => {
    const that = this;
    Modal.confirm({
      title: '确认要锁定该用户吗？',
      content: '点击确认后该用户将被锁定',
      onOk() {
        const { dispatch } = that.props;
        dispatch({
          type: 'userManagement/lockUser',
          payload: key,
        });
      },
      onCancel() {},
    });
  };

  deleteConfirm = key => {
    const that = this;
    Modal.confirm({
      title: '确认要删除该用户吗？',
      content: '点击确认后该用户将被注销',
      onOk() {
        const { dispatch } = that.props;
        dispatch({
          type: 'userManagement/deleteUser',
          payload: key,
        });
      },
      onCancel() {},
    });
  };

  handleCancel = () => {
    this.closeModel();
  };

  handleSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManagement/searchUser',
      payload: value,
    });
  };

  render() {
    const { filterData, loading } = this.props;
    return (
      <div>
        <h1>用户管理</h1>
        <p>
          <LocalizedModal text="新建用户" />
        </p>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={this.handleSearch}
        />

        <Table columns={this.columns} dataSource={filterData} loading={loading} />
      </div>
    );
  }
}

export default TableList;
