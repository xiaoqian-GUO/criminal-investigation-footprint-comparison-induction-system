import React, { Component } from 'react';
import { Table, Button, Modal, Input, Collapse, Icon } from 'antd';
import { connect } from 'dva';
import LocalizedMergeCaseModal from './LocalizedMergeCaseModal';
import styles from './MergeCaseList.less';
import 'antd/dist/antd.css';

const { Search } = Input;
const Panel = Collapse.Panel;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 1,
  overflow: 'hidden',
};

@connect(({ mergecaseManagement, loading }) => ({
  filterData: mergecaseManagement.filterData,
  loading: loading.effects['mergecaseManagement/fetchAllMergeCases'],
}))
class MergeCaseList extends Component {
  state = {
    isExpand: false
  };
  // 表头数据
  columns = [
    {
      title: '并案号',
      dataIndex: 'mergecaseid',
      width: 80,
    },
    {
      title: '并案名称',
      dataIndex: 'mergecaseName',
      width: 100,
    },
    {
      title: '包含案件号',
      dataIndex: 'includeCases',
      width: 150,
    },
    {
      title: '并案时间',
      dataIndex: 'mergeTime',
      width: 120,
    },
    {
      title: '案发时间',
      dataIndex: 'time',
      width: 120,
    },
   
    {
      title: '案件状态',
      dataIndex: 'caseStatus',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <span className={styles['override-ant-btn']}>
          <LocalizedMergeCaseModal text="编辑" data={record} />
          <Button type="danger" onClick={() => this.deleteConfirm(record.mergecaseid)}>
            删除
          </Button>
        </span>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    // 获取用户数据
    dispatch({ type: 'mergecaseManagement/fetchAllMergeCases' });
  }

  deleteConfirm = key => {
    const that = this;
    Modal.confirm({
      title: '确认要删除该串并案吗？',
      content: '点击确认后该串并案将被删除',
      onOk() {
        const { dispatch } = that.props;
        dispatch({
          type: 'mergecaseManagement/delMergeCase',
          payload: {
            mergecaseid: key,
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
      type: 'mergecaseManagement/queryMergeCases',
      payload: value,
    });
  };
  callback = (key) => {
    var bol = key.length? true:false;
    this.setState({
      isExpand: bol
    });
  }

  render() {
    const { filterData, loading } = this.props;
    const { isExpand } = this.state;

    return (
      <div className={styles.mainDiv}>
        <h1>串并案管理</h1>
        <div className={styles.searchInput}>
          <Search placeholder="根据并案号查询" enterButton="Search" onSearch={this.handleSearch} />
        </div>
        <Collapse
          bordered={true}
          onChange={this.callback}
        >
          <Panel showArrow={false} header={isExpand?(<span><Icon type='down-circle' />&nbsp;&nbsp;查询表单</span>):
            (<span><Icon type='right-circle' />&nbsp;&nbsp;查询表单</span>)} key="1" style={customPanelStyle}>
            <Button type="primary" size="small">点击</Button>
          </Panel>
        </Collapse>

        <Table
          columns={this.columns}
          bordered
          dataSource={filterData}
          rowKey={record => record.mergecaseid}
          loading={loading}
        />
      </div>
    );
  }
}

export default MergeCaseList;
