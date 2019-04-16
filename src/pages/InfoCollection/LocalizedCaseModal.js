/**
 * @author:stanny
 * date:2018-11-02
 * @description: modify user password and authority
 */
import React from 'react';
import { Button, Modal, Form, Input, Cascader } from 'antd';
import { connect } from 'dva';
import styles from './LocalizedCaseModal.less';

const FormItem = Form.Item;

const options = [
  {
    value: '黑龙江省公安厅',
    label: '黑龙江省公安厅',
    children: [
      {
        value: '哈尔滨市公安局',
        label: '哈尔滨市公安局',
        children: [
          {
            value: '南岗分局',
            label: '南岗分局',
          },
          {
            value: '道里分局',
            label: '道里分局',
          },
          {
            value: '道外分局',
            label: '道外分局',
          },
          {
            value: '香坊分局',
            label: '香坊分局',
          },
        ],
      },
      {
        value: '大庆市公安局',
        label: '大庆市公安局',
        children: [
          {
            value: '萨尔图区',
            label: '萨尔图区',
          },
          {
            value: '龙凤区',
            label: '龙凤区',
          },
          {
            value: '让胡路区',
            label: '让胡路区',
          },
          {
            value: '红岗区',
            label: '红岗区',
          },
        ],
      },
    ],
  },
];

class LocalizedCaseModal extends React.Component {
  state = { visible: false };

  handleClick = () => {
    // this.showModal();
    const {
      form: { setFieldsValue },
      text,
      data,
    } = this.props;

    if (text === '编辑') {
      const arr = data.institution.split(' / ');
      setFieldsValue({
        username: data.username,
        password: data.password,
        name: data.name,
        userid: data.userid,
        institution: arr,
        phone: data.phone,
      });
    } else {
      setFieldsValue({
        username: '',
        password: '',
        name: '',
        userid: '',
        institution: ['黑龙江省公安厅', '哈尔滨市公安局', '南岗分局'],
        phone: '',
      });
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  submitEdit = () => {
    const {
      dispatch,
      form: { validateFields },
      data,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const { username, password, name, userid, institution, phone } = values;
        dispatch({
          type: 'userManagement/editUserInfo',
          payload: {
            username,
            name,
            userid,
            institution: institution.join(' / '),
            phone,
            email: data.email,
          },
        });
        // 更新密码
        dispatch({
          type: 'userManagement/editUser',
          payload: {
            username,
            password,
          },
        });
        // 重置 `visible` 属性为 false 以关闭对话框
        this.setState({ visible: false });
      }
    });
  };

  submitNew = () => {
    const {
      dispatch,
      form: { validateFields },
      data,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        var newValue = {
          ...values,
          institution: values.institution.join(' / '),
          email: '',
        };
        dispatch({
          type: 'userManagement/addUser',
          payload: newValue,
        });
        // 重置 `visible` 属性为 false 以关闭对话框
        this.setState({ visible: false });
      }
    });
  };

  render() {
    const { visible } = this.state;
    const {
      text,
      form: { getFieldDecorator },
    } = this.props;

    let modalConfig;
    if (text === '编辑') {
      modalConfig = {
        title: '修改用户',
        onOk: this.submitEdit,
        Input: <Input readOnly />,
        label: '用户名',
      };
    } else {
      modalConfig = {
        title: '新建用户',
        onOk: this.submitNew,
        Input: <Input />,
        label: '用户名',
      };
    }

    return (
      <span>
        <Button
          type="primary"
          onClick={() => {
            this.showModal();
            this.handleClick();
          }}
        >
          {text}
        </Button>
        <Modal
          title={modalConfig.title}
          visible={visible}
          onOk={modalConfig.onOk}
          onCancel={this.hideModal}
          okText="提交"
          cancelText="返回"
          
        >
          <Form className={styles.userForm}>
            <FormItem label={modalConfig.label}>
              {getFieldDecorator('username', {
                rules: [{ required: true }],
              })(modalConfig.Input)}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
            <FormItem label="用户姓名">
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
            <FormItem label="警号（6位数字）">
              {getFieldDecorator('userid', {
                rules: [{ required: true }],
              })(<Input maxLength="6" />)}
            </FormItem>
            <FormItem label="所属单位">
              {getFieldDecorator('institution', {
                initialValue: ['黑龙江省公安厅', '哈尔滨市公安局', '南岗分局'],
                rules: [{ type: 'array', required: true }],
              })(<Cascader options={options} changeOnSelect placeholder="请选择所属单位" />)}
            </FormItem>
            <FormItem label="联系电话">
              {getFieldDecorator('phone', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default connect()(Form.create()(LocalizedCaseModal));
