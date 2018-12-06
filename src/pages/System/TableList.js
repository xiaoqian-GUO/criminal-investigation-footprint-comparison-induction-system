import React, { Component } from 'react';
import { Table, Button, Modal, Input } from 'antd';
import { connect } from 'dva';
import LocalizedModal from './LocalizedModal';
import styles from './TableList.less';

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
      width: 200,
    },
    {
      title: '密码',
      dataIndex: 'password',
      width: 200,
    },
    {
      title: '所属机构',
      dataIndex: 'institution',
      width: 200,
    },
    {
      title: '锁定状态',
      dataIndex: 'locked',
      render: item => {
        return item ? '锁定' : '未锁定';
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 400,
      render: (text, record) => (
        <span className={styles['override-ant-btn']}>
          <LocalizedModal text="编辑" data={record} />
          {record.locked ? (
            <Button onClick={() => this.lockConfirm(record.username, record.locked)}>
              解除锁定
            </Button>
          ) : (
            <Button onClick={() => this.lockConfirm(record.username, record.locked)}>锁定</Button>
          )}
          <Button type="danger" onClick={() => this.deleteConfirm(record.username)}>
            删除
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

  lockConfirm = (username, locked) => {
    const that = this;
    let modalConfig;
    if (locked) {
      modalConfig = {
        title: '确认要解除该用户的锁定吗？',
        content: '点击确认后该用户将被解除锁定',
      };
    } else {
      modalConfig = {
        title: '确认要锁定该用户吗？',
        content: '点击确认后该用户将被锁定',
      };
    }
    Modal.confirm({
      title: modalConfig.title,
      content: modalConfig.content,
      onOk() {
        const { dispatch } = that.props;
        dispatch({
          type: 'userManagement/lockUser',
          payload: { username, locked },
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
        <div className={styles.searchInput}>
          <Search placeholder="根据用户名查询" enterButton="Search" onSearch={this.handleSearch} />
        </div>
        <p>
          <LocalizedModal text="新建用户" />
        </p>
        <Table
          columns={this.columns}
          bordered
          dataSource={filterData}
          rowKey={record => record.username}
          loading={loading}
        />
      </div>
    );
  }
}

export default TableList;
