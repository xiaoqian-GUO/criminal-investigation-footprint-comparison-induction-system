import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert, Input, Icon,Button} from 'antd';
import styles from './BasicInfo.less';
import Avatar from './Avatar';

@connect(({ info }) => ({
  imageUrl: info.imageUrl,
  backgroundImg: info.backgroundImg
}))
class BasicInfo extends React.Component {
  state = {
    caseid: ''
  }
  handleChange = (e) => {
    this.setState({
      caseid: e.target.value
    });
  }
  handleClick = ()  => {
    const { caseid } = this.state;
    const { dispatch } = this.props;
    if( caseid ){
      dispatch({
        type: 'info/fetchCasePic',
        payload: {
          caseid: caseid
        }
      });
    }

  }
  render() {
    const {
      imageUrl,
      loading,
    } = this.props;
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.headerNav}>
            <Breadcrumb>
              <Breadcrumb.Item><a href="/infoquery/basic-info">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>足迹信息查询</Breadcrumb.Item>
              <Breadcrumb.Item>查询案件所属足迹图片</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.headerH}>
            <h2>足迹查询</h2>
          </div>
        </div>
        <div className={styles.contentBody}>
            <div className={styles.flexBody}>
              <div className={styles.upload}>
                  <div>
                    <div>
                      <p className={styles.centerPara}>案件编号：</p>
                      <Input type="text" value={ this.state.caseid } onChange={this.handleChange}/>
                    </div>
                    <br/>
                    <div>
                      <div className={styles.marginAuto}>
                          <Button type="primary" onClick={this.handleClick}>开始查询</Button>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={styles.centerContent}>
                  <div><Icon type="arrow-right"/></div>
              </div>
              <div className={styles.rightContent}>
                  
                  <div id="result" className={styles.result}>
                      <img className={styles.imgStyle} src="/foot.jpg" style={{width:50,height:50}}/>
                  </div>
                  {/*
                    <div className={styles.marginRightAuto}>
                      <Button type="primary">开始归纳比对</Button>
                    </div>
                   */
                  }
              </div>

            </div>
        </div>
        <br/>
      </div>
    );
  }
}
export default BasicInfo;
