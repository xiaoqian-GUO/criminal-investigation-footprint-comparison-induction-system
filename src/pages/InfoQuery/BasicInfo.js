import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert,Input, Icon,Button} from 'antd';
import styles from './BasicInfo.less';
import Avatar from './Avatar';

@connect(({ info, loading }) => ({
  info,
  loading: loading.models.info,
}))
class BasicInfo extends React.Component {
  constructor(){
    super();
    this.state={
      visible:true,
      userName:''
    };
  }
  handlerClose=(e)=>{
    this.setState({visible:false});
  }
  handlerEmpty=()=>{
    //点击后缀图标，清空输入框
    this.setState({
      userName:''
    });
    //并且将焦点放到输入框上，重新输入
    this.userNameNode.focus();
  }
  onChange=(e)=>{
    this.setState({
      userName:e.target.value
    });
  }
  render() {
    const {
      info: { info },
      loading,
    } = this.props;
    // 判断suffix是否显示
    var suffix=this.state.userName?<Icon type="close-circle" onClick={this.handlerEmpty} />:null;
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.headerNav}>
            <Breadcrumb>
              <Breadcrumb.Item><a href="/infoquery/basic-info">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>足迹信息查询</Breadcrumb.Item>
              <Breadcrumb.Item>查询页</Breadcrumb.Item>
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
                      <Avatar id="upload" />
                    </div>
                    <br/>
                    <div>
                      <div className={styles.marginAuto}>
                          <Button type="primary">开始查询</Button>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={styles.centerContent}>
                  <div><Icon type="arrow-right"/></div>
              </div>
              <div className={styles.rightContent}>
                  
                  <div id="result" className={styles.result}>
                      <img className={styles.imgStyle} src="/hgd.png" style={{width:50,height:50}}/>
                      <img className={styles.imgStyle} src="/hgd.png" style={{width:50,height:50}}/>
                      <img className={styles.imgStyle} src="/hgd.png" style={{width:50,height:50}}/>
                  </div>
                  <div className={styles.marginRightAuto}>
                      <Button type="primary">开始归纳比对</Button>
                  </div>
                   
              </div>

            </div>
        </div>
        <br/>
      </div>
    );
  }
}
export default BasicInfo;
