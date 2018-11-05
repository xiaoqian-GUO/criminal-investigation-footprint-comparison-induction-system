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
        key: data.key,
        username: data.username,
        password: data.password,
        authority: data.authority,
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
      data,
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      console.log(values);
      if (!err) {
        dispatch({
          type: 'userManagement/editUser',
          payload: {
            ...values,
            key: data.key,
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
        dispatch({
          type: 'userManagement/addUser',
          payload: values,
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
      };
    } else {
      modalConfig = {
        title: '新建用户',
        onOk: this.submitNew,
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
          cancelText="取消"
        >
          <Form>
            {/* <FormItem label="key">{getFieldDecorator('key', {})(<Input />)}</FormItem> */}
            <FormItem label="用户名">
              {getFieldDecorator('username', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
            <FormItem label="权限">
              {getFieldDecorator('authority', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default connect()(Form.create()(LocalizedModal));
