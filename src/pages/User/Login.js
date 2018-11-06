import React, { Component } from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon, Input, Button } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import { stringify } from 'qs';
import { fakeLogin} from '@/services/api';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: false,
    username:'',
    password:'',
    hasUser:false,
    hasPwd:false,
    result:false,
  };

  componentDidMount(){
    // localStorage.setItem("antd-pro-authority","guest");
    // localStorage.setItem("login","");
  }

  onChangeUserName=(e)=>{
    var bol=e.target.value?false:true;
    this.setState({
      username:e.target.value,
      hasUser:bol,
    });
  }
  emitUserEmpty=()=>{
    this.userNameInput.focus();
    this.setState({
      username:'',
      hasUser:true,
    });
  }
  onChangePassword=(e)=>{
    var bol=e.target.value?false:true;
    this.setState({
      password:e.target.value,
      hasPwd:bol,
    });
  }
  emitPwdEmpty=()=>{
    this.passwordInput.focus();
    this.setState({
      password:'',
      hasPwd:true,
    });
  }

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );
  onClick=(e)=>{
      const { dispatch } = this.props;
      this.setState({
        result:false
      });
      var {username,password} = this.state;
      if(username=="" || password==""){
          var bol1=username?false:true;
          var bol2=password?false:true;
          this.setState({
            hasUser:bol1,
            hasPwd:bol2,
          });
      }
      else{
        // 信息填写完成，但是还没有验证
        var params={
          username:username,
          password:password,
        };
        var rsu=fakeLogin(params);
        rsu.then((response)=>{
          if(response.status!="error"){
              this.setState({
                result:false
              });
              var authority=response.status==="0"?"admin":"user";
              localStorage.setItem("antd-pro-authority",authority);
              localStorage.setItem("login",username);
              dispatch({
                type:"login/changeLoginAuthority",
                payload:{},
              });
              this.props.dispatch(routerRedux.push({
                pathname:'/account/settings/base',
                query:response,
            }));
          }
          else{
            localStorage.setItem("antd-pro-authority","guest");
            localStorage.setItem("login","");
            this.emitUserEmpty();
            this.setState({
              hasUser:true,
              hasPwd:true,
              result:true,
              username:'',
              password:'',
            });
          }
        });
      }
  }

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    var username=this.state.username;
    var password=this.state.password;
    var suffix=username?<Icon type="close-circle" onClick={this.emitUserEmpty} /> : null;
    var suffix2=password?<Icon type="close-circle" onClick={this.emitPwdEmpty} /> : null;
    return (
      <div className={styles.main}>
      <br/>
        {/* <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        > 
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            
             <UserName name="userName" placeholder="admin/user" />
            <Password
              name="password"
              placeholder="888888/123456"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <div>

          </div>
           <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit> 
        </Login>  */}
        <div className={styles.username}>
          <div className={styles.errorInfo}>
            {
              this.state.result?(
                <Alert message="账号或密码错误, 请重新输入！" type="error" showIcon/>
              ):null
            }
          </div>
          <Input.Group size="large">
            <div className={styles.inputInfo}>
              <Input
                placeholder="Username"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={suffix}
                value={username}
                onChange={this.onChangeUserName}
                ref={node => this.userNameInput = node}
              />
              {
                this.state.hasUser?(<p className={styles.inputAfterText}>please enter username!</p>):null
              }
            </div>
            <div className={styles.inputInfo}>
              <Input
                type="password"
                placeholder="Password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={suffix2}
                value={password}
                onChange={this.onChangePassword}
                ref={node => this.passwordInput = node}
              />
              {
                this.state.hasPwd?(<p className={styles.inputAfterText}>please enter password!</p>):null
              }
            </div>
          </Input.Group>
          <Button onClick={this.onClick} type="primary" className={styles.submitBtn}>登录</Button>
        </div>
       
      </div>
    );
  }
}

export default LoginPage;
