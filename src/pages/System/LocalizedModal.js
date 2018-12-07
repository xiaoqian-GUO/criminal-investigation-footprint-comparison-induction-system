/**
 * @author:stanny
 * date:2018-11-02
 * @description: modify user password and authority
 */
import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

class LocalizedModal extends React.Component {
  state = { visible: false };

  handleClick = () => {
    // this.showModal();
    const {
      form: { setFieldsValue },
      text,
      data,
    } = this.props;

    if (text === '编辑') {
      setFieldsValue({
        username: data.username,
        password: data.password,
        institution: data.institution,
      });
    } else {
      setFieldsValue({
        username: '',
        password: '',
        institution: '',
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
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        dispatch({
          type: 'userManagement/editUser',
          payload: {
            username,
            password
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
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        var newValue = {
          ...values,
          name: '',
          userid: '',
          email: '',
          phone: '',
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
        label: '用户名（不可修改）',
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
          <Form>
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
            <FormItem label="组织">
              {getFieldDecorator('institution', {
                rules: [{ required: true }],
              })(modalConfig.Input)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default connect()(Form.create()(LocalizedModal));
