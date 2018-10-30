import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Button, Alert } from 'antd';
import { connect } from 'dva';
import { getAllUserinfo } from '@/services/user';
import styles from './BaseView.less';
// import GeographicView from './GeographicView';
// import PhoneView from './PhoneView';
// import { getTimeDistance } from '@/utils/utils';

const FormItem = Form.Item;

@connect(({ user }) => ({
  currentUser: user.currentUser,
  users: user.users,
  allInfo: user.allInfo,
}))
@Form.create()
class BaseView extends Component {
  constructor() {
    super();
    this.state = {
      result: false,
    };
  }

  componentDidMount() {
    const { users } = this.props;
    const ele = document.getElementsByClassName('ant-menu-submenu')[3];
    const rsu = getAllUserinfo(users);
    const tgt = document.getElementsByClassName(
      'antd-pro\\components\\-global-header\\index-name'
    )[0];
    if (Object.keys(users).length > 0) {
      // 如果是普通用户，不允许查看当前的所有用户，即系统管理功能
      if (users.status === 1) {
        ele.style.display = 'none';
      }

      rsu.then(response => {
        // console.log('显示当前用户的所有个人信息');
        // console.log(response);
        this.setBaseInfo(response);

        // console.log(tgt);
        tgt.innerHTML = response.username;
      });
    } else {
      this.setBaseInfo({});
      // var tgt = document.getElementsByClassName(
      //   'antd-pro\\components\\-global-header\\index-name'
      // )[0];
      tgt.innerHTML = '';
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
    const { form } = this.props;
    const formValue = form.getFieldsValue();
    // console.log(formValue);
    let bol = true;
    Object.keys(formValue).forEach(key => {
      if (!formValue[key]) {
        bol = false;
      }
    });
    if (bol) {
      // 如果bol为true的话，就可以提交数据，否则不允许提交
      if (true) {
        // 如果信息更新成功，则提示信息修改成功
        this.setState({
          result: true,
        });
      } else {
        // ??
      }
    } else {
      // 信息不完整 不允许提交
    }
  };

  render() {
    // console.log(this.props);
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { result } = this.state;
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
                <Alert type="success" message="信息更新成功" banner showIcon />
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
