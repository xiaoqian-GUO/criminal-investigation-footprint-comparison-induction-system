import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Button, Alert,List } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import { updatePwd} from '@/services/user';
// import { getTimeDistance } from '@/utils/utils';
const FormItem = Form.Item;

@connect(({ user }) => ({
  currentUsers:user.allInfo || {},     //从baseview页面更新过来的当前用户的详细信息
}))
@Form.create()
// const passwordStrength = {
//   strong: (
//     <font className="strong">
//       <FormattedMessage id="app.settings.security.strong" defaultMessage="Strong" />
//     </font>
//   ),
//   medium: (
//     <font className="medium">
//       <FormattedMessage id="app.settings.security.medium" defaultMessage="Medium" />
//     </font>
//   ),
//   weak: (
//     <font className="weak">
//       <FormattedMessage id="app.settings.security.weak" defaultMessage="Weak" />
//       Weak
//     </font>
//   ),
// };

class SecurityView extends Component {
  constructor(){
    super();
    this.state={
      result:false,
      errorResult:false,
      errorText:"密码修改失败，请重新提交",
    };
  }
  componentDidMount() {
    if(Object.keys(this.props.currentUsers).length>0){

    }
    else{
      alert('认证失败，请重新登陆！');
      window.location.href="/user/login";
    }
  }
  handleEmpty = () => {
    let { form, currentUsers } = this.props;
    let formValue = form.getFieldsValue();
    
    Object.keys(formValue).forEach(key => {
      if(key=="newpwd" || key=="newpwdAgain"){
        formValue[key]=null;
      }
      form.setFieldsValue(formValue);
    });
    this.newpwdInput.focus();
  };
  emptyAll = () => {
    let { form, currentUsers } = this.props;
    form.setFieldsValue({oldpwd:null,newpwd:null,newpwdAgain:null});
    this.oldpwdInput.focus();
  };

  getViewDom = ref => {
    this.view = ref;
  };
  handleSubmit=()=>{
    let { form } = this.props;
    let formValue = form.getFieldsValue();
    let bol=true;
    let rsu;
    let obj;
    this.setState({
      result:false,
      errorResult:false,
    });
    Object.keys(formValue).forEach(key => {
      if(!formValue[key]){
        bol=false;
      }
    });
    
    if(bol){
      // 如果bol为true的话，就可以提交数据，否则不允许提交
      if(formValue["newpwd"]!=formValue["newpwdAgain"]){
        this.setState({
          result:false,
          errorResult:true,
          errorText:"两次输入新密码不匹配，请重新输入",
        });
        this.handleEmpty();
      }
      else{
        obj={
          ...formValue,
          username:localStorage.getItem("login"),
        };
        rsu=updatePwd(obj);
        rsu.then((response)=>{
          console.log(response);
          if(response.status=="ok"){
            // 如果信息更新成功，则提示信息修改成功
            this.setState({
              result:true,
              errorResult:false
            });
            setTimeout(()=>{
              this.setState({
                result:false,
                errorResult:false
              });
              this.emptyAll();
            },3000);
          }
          else if(response.status=="error"){
            this.setState({
              result:false,
              errorResult:true,
              errorText:"密码更新失败，请重新确认旧密码",
            });
            this.emptyAll();
          }
        });
      }
      
    }
    else{
      // 信息不完整 不允许提交
      
    }
  }
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit}>

            {/* 旧密码 */}
            <FormItem label={formatMessage({ id: 'app.settings.basic.oldpwd' })}>
              {getFieldDecorator('oldpwd', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.oldpwd-message' }, {}),
                  },
                ],
              })(<Input type="password" ref={node=>this.oldpwdInput=node} />)}
            </FormItem>

            {/* 新密码 */}
            <FormItem label={formatMessage({ id: 'app.settings.basic.newpwd' })}>
              {getFieldDecorator('newpwd', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.newpwd-message' }, {}),
                  },
                ],
              })(<Input type="password" ref={node=>this.newpwdInput=node}/>)}
            </FormItem>
             {/* 再次输入新密码 */}
             <FormItem label={formatMessage({ id: 'app.settings.basic.newpwdagain' })}>
              {getFieldDecorator('newpwdAgain', {
                rules: [
                  {
                    required: true, // 是否必选
                    message: formatMessage({ id: 'app.settings.basic.newpwdagain-message' }, {}), // 校验提示信息
                  },
                ],
              })(<Input type="password" />)}
            </FormItem>
            {
              this.state.result?(
                <div className={styles.resultText}>
                    <Alert type="success" message="密码修改成功, 3秒后自动消失..." banner showIcon/>
                </div>
              ):null
            }
            {
              this.state.errorResult?(
                <div className={styles.resultText}>
                    <Alert type="error" message={this.state.errorText} banner showIcon/>
                </div>
              ):null
            }
            <Button type="primary" onClick={this.handleSubmit}>
              <FormattedMessage
                id="app.settings.basic.updatepwd"
                defaultMessage="Update Password"
              />
            </Button>
          </Form>
        </div>
      </div>
    );
  }
  // getData = () => [
  //   {
  //     title: formatMessage({ id: 'app.settings.security.password' }, {}),
  //     description: (
  //       <Fragment>
  //         {formatMessage({ id: 'app.settings.security.password-description' })}：
  //         {passwordStrength.strong}
  //       </Fragment>
  //     ),
  //     actions: [
  //       <a>
  //         <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
  //       </a>,
  //     ],
  //   },
  //   {
  //     title: formatMessage({ id: 'app.settings.security.phone' }, {}),
  //     description: `${formatMessage(
  //       { id: 'app.settings.security.phone-description' },
  //       {}
  //     )}：138****8293`,
  //     actions: [
  //       <a>
  //         <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
  //       </a>,
  //     ],
  //   },
  //   {
  //     title: formatMessage({ id: 'app.settings.security.question' }, {}),
  //     description: formatMessage({ id: 'app.settings.security.question-description' }, {}),
  //     actions: [
  //       <a>
  //         <FormattedMessage id="app.settings.security.set" defaultMessage="Set" />
  //       </a>,
  //     ],
  //   },
  //   {
  //     title: formatMessage({ id: 'app.settings.security.email' }, {}),
  //     description: `${formatMessage(
  //       { id: 'app.settings.security.email-description' },
  //       {}
  //     )}：ant***sign.com`,
  //     actions: [
  //       <a>
  //         <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
  //       </a>,
  //     ],
  //   },
  //   {
  //     title: formatMessage({ id: 'app.settings.security.mfa' }, {}),
  //     description: formatMessage({ id: 'app.settings.security.mfa-description' }, {}),
  //     actions: [
  //       <a>
  //         <FormattedMessage id="app.settings.security.bind" defaultMessage="Bind" />
  //       </a>,
  //     ],
  //   },
  // ];

  // render() {
    
  //   return (
  //     <Fragment>
  //       <List
  //         itemLayout="horizontal"
  //         dataSource={this.getData()}
  //         renderItem={item => (
  //           <List.Item actions={item.actions}>
  //             <List.Item.Meta title={item.title} description={item.description} />
  //           </List.Item>
  //         )}
  //       />
  //     </Fragment>
  //   );
  // }
}

export default SecurityView;
