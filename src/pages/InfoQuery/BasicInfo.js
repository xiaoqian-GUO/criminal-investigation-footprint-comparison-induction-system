import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert,Input, Icon} from 'antd';
import styles from './BasicInfo.less';

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
          <h1>other</h1>
          {/* <h1>other</h1>
          <h3>BasicInfo</h3>
            <button
              onClick={() => {
                window.location.href = '/user/login';
              }}
            >
              点击跳转
            </button>
            <br />
            <button
              onClick={() => {
                this.props.dispatch(
                  routerRedux.push({
                    pathname: '/infoquery/basic-result',
                    state: { id: 10 },
                    query: { name: 'xiaoqian' },
                  })
                );
              }}
            >
              点击携带参数跳转
            </button>
            <br/>
            <button
              onClick={() => {
                var ele = document.getElementsByClassName('ant-avatar')[0];
                var target=ele.nextSibling;
                alert(target.innerHTML);
                target.innerHTML="xiaoqian";
              }}
            >
              点击alert，并修改name
            </button>
            {
              this.state.visible?(
                <div className={styles.alertStyle}>
                  <Alert  type="error" message="alert message text" closable afterClose={this.handlerClose} showIcon />
                </div>
              ):null
            }
          
            <div className={styles.alertStyle}>
              <Input.Group size="large">
                <Input
                  placeholder="Username"
                  prefix={<Icon type="user" style={{color:'rgba(0,0,0,0.5)'}} />}
                  suffix={suffix}
                  value={this.state.userName}
                  onChange={this.onChange}
                  ref={node=>this.userNameNode=node}
                />
              </Input.Group>
            </div>*/}
        </div> 
      </div>
    );
  }
}
export default BasicInfo;
