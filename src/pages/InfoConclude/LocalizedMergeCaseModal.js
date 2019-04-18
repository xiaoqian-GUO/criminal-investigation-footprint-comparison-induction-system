/**
 * @author:stanny
 * date:2018-11-02
 * @description: modify user password and authority
 */
import React from 'react';
import { 
  Modal,
  Form,
  Breadcrumb,
  Input,
  InputNumber,
  Button,
  Upload,
  Icon,
  message,
  Select,
  DatePicker
 } from 'antd';
import { connect } from 'dva';
import styles from './LocalizedMergeCaseModal.less';

const FormItem = Form.Item;
const Option = Select.Option;

function getFormatTime(time) {
  var date = new Date(time.format());
  var currentTime =
    date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate();
  var hour = date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours();
  var minutes =
    date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes();
  var seconds =
    date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds();
  currentTime += ' ' + hour + ':' + minutes + ':' + seconds;
  return currentTime;
}


class LocalizedMergeCaseModal extends React.Component {
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
        mergecaseid: data.mergecaseid,
        mergecaseName: data.mergecaseName,
        mergeTime: moment(data.mergeTime, 'YYYY-MM-DD HH:mm:ss'),
        time: moment(data.time, 'YYYY-MM-DD HH:mm:ss'),
        includeCases: data.includeCases,
        caseStatus: data.caseStatus
      });
    } else {
      
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
        const { mergecaseid, mergecaseName, mergeTime, time, includeCases, caseStatus } = values;
        dispatch({
          type: 'mergecaseManagement/editMergeCaseInfo',
          payload: {
            mergecaseid, 
            mergecaseName, 
            mergeTime: getFormatTime(mergeTime), 
            time: getFormatTime(time), 
            includeCases,
            caseStatus
          },
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
        title: '修改串并案',
        onOk: this.submitEdit,
        Input: <Input readOnly />,
        label: '并案号',
      };
    } else {

    }
    const config = {
      rules: [{ type: 'object', required: true, message: '请选择时间!' }],
    };

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
              {getFieldDecorator('mergecaseid', {
                rules: [{ required: true }],
              })(modalConfig.Input)}
            </FormItem>
            <FormItem label="并案名称">
              {getFieldDecorator('mergecaseName', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
            <FormItem label="并案时间">
              {getFieldDecorator('mergeTime', config)(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </FormItem>
            <FormItem label="案发时间">
              {getFieldDecorator('time', config)(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </FormItem>

            <FormItem label="包含案件号">
              {getFieldDecorator('includeCases', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
            <FormItem label="案件状态">
              {getFieldDecorator('caseStatus', {
                initialValue: '未破案',
                rules: [{ required: true }],
              })(
                <Select>
                  <Option value="已破案">已破案</Option>
                  <Option value="未破案">未破案</Option>
                </Select>
              )}
            </FormItem>
            
          </Form>
        </Modal>
      </span>
    );
  }
}

export default connect()(Form.create()(LocalizedMergeCaseModal));
