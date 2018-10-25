import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert,Input, Icon} from 'antd';
import styles from './BasicResult.less';

class BasicResult extends React.Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.headerNav}>
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>足迹信息查询</Breadcrumb.Item>
              <Breadcrumb.Item>查询结果页</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.headerH}>
            <h2>查询结果</h2>
          </div>
        </div>
        <div className={styles.contentBody}>
          <h1>other</h1>
        </div> 
      </div>
    );
  }
}
export default BasicResult;
