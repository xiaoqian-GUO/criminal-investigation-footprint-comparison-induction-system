import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Button, Alert,List } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
// import { getTimeDistance } from '@/utils/utils';
const FormItem = Form.Item;

@connect(({ user }) => ({
  currentUsers:user.allInfo,
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
    };
  }
  componentDidMount() {
    
  }

  setBaseInfo = (res) => {
    const { form } = this.props;
    const formValue = form.getFieldsValue();
    
    Object.keys(formValue).forEach(key => {
      const obj = {};
      obj[key] = res[key] || null;
      form.setFieldsValue(obj);
    });
  };

  getViewDom = ref => {
    this.view = ref;
  };
  handleSubmit=()=>{
    this.setState({
      result:false,
      errorResult:false,
    });
    const { form } = this.props;
    const formValue = form.getFieldsValue();
    console.log(formValue);
    const bol=true;
    Object.keys(formValue).forEach(key => {
      if(!formValue[key]){
        bol=false;
      }
    });
    
    if(bol){
      // 如果bol为true的话，就可以提交数据，否则不允许提交
      const rsu=updateUserInfo(formValue);
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
          },3000);
        }
        else if(response.status=="error"){
          this.setState({
            result:false,
            errorResult:true
          });
        }
      });
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
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            {/* 用户名 */}
            <FormItem label={formatMessage({ id: 'app.settings.basic.username' })}>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.username-message' }, {}),
                  },
                ],
              })(<Input readOnly/>)}
              <span className={styles.spanWarn}>（注意:不可修改）</span>
            </FormItem>

            {/* 用户姓名 */}
            <FormItem label={formatMessage({ id: 'app.settings.basic.name' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.name-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>

            {/* 工号 */}
            <FormItem label={formatMessage({ id: 'app.settings.basic.userId' })}>
              {getFieldDecorator('userId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.userId-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
             {/* 邮箱 */}
             <FormItem label={formatMessage({ id: 'app.settings.basic.email' })}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true, // 是否必选
                    message: formatMessage({ id: 'app.settings.basic.email-message' }, {}), // 校验提示信息
                  },
                ],
              })(<Input />)}
            </FormItem>
            {/* 所属单位 */}
            <FormItem label={formatMessage({ id: 'app.settings.basic.address' })}>
              {getFieldDecorator('insitution', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.address-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            {/* 手机号码 */}
            <FormItem label={formatMessage({ id: 'app.settings.basic.phone' })}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.basic.phone-message' }, {}),
                  },
                ],
              })(<Input placeholder="请输入手机号码" />)}
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
                    <Alert type="error" message="密码修改失败，请重新提交" banner showIcon/>
                </div>
              ):null
            }
            <Button type="primary" onClick={this.handleSubmit}>
              <FormattedMessage
                id="app.settings.basic.update"
                defaultMessage="Update Information"
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
