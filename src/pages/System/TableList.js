import React, { Component } from 'react';
import { Table, Button, Modal } from 'antd';
import { connect } from 'dva';
import LocalizedModal from './LocalizedModal';

@connect(({ userManagement, loading }) => ({
  data: userManagement.data,
  loading: loading.effects['userManagement/fetchAllUsers'],
}))
class TableList extends Component {
  // 表头数据
  columns = [
    {
      title: 'key',
      dataIndex: 'key',
    },
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
    },
    {
      title: '操作',
      key: 'action',
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

  // 操作：编辑
  handleEdit = () => {};

  // 操作：锁定
  handleLock = () => {};

  // 操作：删除
  handleDelete = () => {
    this.showModal();
  };

  handleCancel = () => {
    this.closeModel();
  };

  render() {
    const { data, loading } = this.props;
    return (
      <div>
        <h1>用户管理</h1>
        <p>
          <LocalizedModal text="新建用户" />
        </p>
        <Table columns={this.columns} dataSource={data} loading={loading} />
      </div>
    );
  }
}

export default TableList;
