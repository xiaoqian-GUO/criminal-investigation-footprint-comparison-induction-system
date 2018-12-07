import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert, Input, Icon, Table, Button, Modal} from 'antd';
import styles from './BasicResult.less';

const { Search } = Input;

@connect(({ info, loading }) => ({
  filterCases: info.filterCases,
  loading: loading.effects['info/fetchAllCases'],
}))
class BasicResult extends React.Component {
  // 表头数据
  columns = [
    {
      title: '案件编号',
      dataIndex: 'caseid',
      width: 200,
    },
    {
      title: '案件详情',
      dataIndex: 'detail',
      width: 200,
    },
    {
      title: '地点',
      dataIndex: 'location',
      width: 200,
    },
    {
      title: '足迹采集方式',
      dataIndex: 'gatherMethod',
      width: 200,
    },
    {
      title: '足迹遗留方式',
      dataIndex: 'leaveMethod',
      width: 200,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    // 获取用户数据
    dispatch({ type: 'info/fetchAllCases' });
  }

  handleSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/fetchAllSimilarCases',
      payload: {
        caseid: value,
      },
    });
  };

  render() {
    const { filterCases, loading } = this.props;
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.headerNav}>
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>足迹信息查询</Breadcrumb.Item>
              <Breadcrumb.Item>查询所有管辖案件</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.headerH}>
            <h2>所有管辖案件</h2>
          </div>
        </div>
        <div className={styles.contentBody} id="allCases">
          <div className={styles.searchInput}>
            <Search placeholder="根据案件编号查询所有相似案件" enterButton="点击查询" onSearch={this.handleSearch} />
          </div>
          <Table
            columns={this.columns}
            bordered
            dataSource={filterCases}
            rowKey={record => record.caseid}
            loading={loading}
          />
        </div> 
      </div>
    );
  }
}
export default BasicResult;
