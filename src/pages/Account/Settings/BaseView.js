import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Button, Alert } from 'antd';
import { connect } from 'dva';
import { getAllUserinfo, updateUserInfo } from '@/services/user';
import styles from './BaseView.less';

// import GeographicView from './GeographicView';
// import PhoneView from './PhoneView';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;

@connect(({ user }) => ({
  currentUser: user.currentUser,    //当前用户
  users: user.users,                //从model传过来的登陆状态，保存用户的username和status身份（管理员or普通用户）
  allInfo: user.allInfo,            //当前用户的详细信息
}))
@Form.create()
class BaseView extends Component {
  constructor() {
    super();
    this.state = {
      result: false,
      errorResult: false,
    };
  }

  componentDidMount() {
    const { users, dispatch } = this.props;
    const rsu = getAllUserinfo(users);

    if (Object.keys(users).length > 0) {
      rsu.then(response => {
        // console.log('显示当前用户的所有个人信息');
        // console.log(response);
        this.setBaseInfo(response);
        dispatch({
          type: 'user/modifyUserInfo',
          payload: response,
        });
      });
    } else {
      alert('认证失败，请重新登陆！');
      window.location.href = '/user/login';
    }
  }

  setBaseInfo = res => {
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

  handleSubmit = () => {
    this.setState({
      result: false,
      errorResult: false,
    });
    const { form } = this.props;
    const formValue = form.getFieldsValue();
    let bol = true;
    Object.keys(formValue).forEach(key => {
      if (!formValue[key]) {
        bol = false;
      }
    });

    if (bol) {
      // 如果bol为true的话，就可以提交数据，否则不允许提交
      const rsu = updateUserInfo(formValue);
      rsu.then(response => {
        console.log(response);
        if (response.status === 'ok') {
          // 如果信息更新成功，则提示信息修改成功
          this.setState({
            result: true,
            errorResult: false,
          });
          setTimeout(() => {
            this.setState({
              result: false,
              errorResult: false,
            });
          }, 3000);
        } else if (response.status === 'error') {
          this.setState({
            result: false,
            errorResult: true,
          });
        }
      });
    } else {
      // 信息不完整 不允许提交
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { result, errorResult } = this.state;
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
              })(<Input readOnly />)}
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
            {result ? (
              <div className={styles.resultText}>
                <Alert type="success" message="信息更新成功, 3秒后自动消失..." banner showIcon />
              </div>
            ) : null}
            {errorResult ? (
              <div className={styles.resultText}>
                <Alert type="error" message="信息提交失败，请重新提交" banner showIcon />
              </div>
            ) : null}
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
}

export default BaseView;
