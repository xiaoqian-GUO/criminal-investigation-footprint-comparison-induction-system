import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert,Input, Icon} from 'antd';
import styles from './Conclude.less';

class Conclude extends React.Component {
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
              <Breadcrumb.Item>足迹比对归纳</Breadcrumb.Item>
              <Breadcrumb.Item>足迹归纳页</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.headerH}>
            <h2>归纳结果</h2>
          </div>
        </div>
        <div className={styles.contentBody}>
            <div className={styles.flexBody}>
              <div className={styles.rightContent}>
                  <img src="/foot.jpg"/>
              </div>

              <div className={styles.centerContent}>
                  <div><Icon type="swap"/></div>
              </div>

              <div className={styles.rightContent}>
                  <img src="/foot2.jpg"/>
              </div>

            </div>
            
            <div className={styles.concludeResult}>
                  <div className={styles.concludeText}>对比归纳结果: </div>
                  <div className={styles.conclude}>
                        经归纳对比，两个案件相似度不高，不建议并案！
                  </div>
            </div>
        </div> 
      </div>
    );
  }
}
export default Conclude;
