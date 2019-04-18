import React, { Component } from 'react';
import { Table, Button, Modal, Input } from 'antd';
import { connect } from 'dva';
import LocalizedCaseModal from './LocalizedCaseModal';
import styles from './CaseList.less';
import moment from 'moment';

const { Search } = Input;

@connect(({ caseManagement, loading }) => ({
  filterData: caseManagement.filterData,
  loading: loading.effects['caseManagement/fetchAllCases'],
}))
class CaseList extends Component {
  // 表头数据
  columns = [
    {
      title: '案件编号',
      dataIndex: 'caseid',
      width: 80,
    },
    {
      title: '案件状态',
      dataIndex: 'caseStatus',
      width: 80,
    },
    {
      title: '案发地点',
      dataIndex: 'location',
      width: 100,
    },
    {
      title: '案件类别',
      dataIndex: 'caseType',
      width: 100,
    },
    {
      title: '侵入方式',
      dataIndex: 'enterType',
      width: 100,
    },
    {
      title: '被盗物品',
      dataIndex: 'stolen',
      width: 100,
    },
    {
      title: '作案人数',
      dataIndex: 'persons',
      width: 100,
    },
    {
      title: '案发时间',
      dataIndex: 'time',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <span className={styles['override-ant-btn']}>
          <LocalizedCaseModal text="查看并编辑" data={record} />
          <Button type="danger" onClick={() => this.deleteConfirm(record.caseid)}>
            删除
          </Button>
        </span>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    // 获取用户数据
    dispatch({ type: 'caseManagement/fetchAllCases' });
  }

  deleteConfirm = key => {
    const that = this;
    Modal.confirm({
      title: '确认要删除该案件吗？',
      content: '点击确认后该案件将被删除',
      onOk() {
        const { dispatch } = that.props;
        dispatch({
          type: 'caseManagement/delCase',
          payload: {
            caseid: key,
          },
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
      type: 'caseManagement/queryCases',
      payload: value,
    });
  };

  render() {
    const { filterData, loading } = this.props;

    return (
      <div className={styles.mainDiv}>
        <h1>案件管理</h1>
        <div className={styles.searchInput}>
          <Search placeholder="根据案件编号查询" enterButton="Search" onSearch={this.handleSearch} />
        </div>
        <p>
          <LocalizedCaseModal text="新建案件" />
        </p>
        <Table
          columns={this.columns}
          bordered
          dataSource={filterData}
          rowKey={record => record.caseid}
          loading={loading}
        />
      </div>
    );
  }
}

export default CaseList;
