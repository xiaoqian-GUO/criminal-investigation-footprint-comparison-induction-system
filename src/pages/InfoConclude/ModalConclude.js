import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { connect } from 'dva';
import styles from './ModalConclude.less';

const FormItem = Form.Item;

@connect(({ concludecases }) => ({
  details: concludecases.details,         //表示案件的详情

}))
@Form.create()
class ModalConclude extends React.Component {
  state = { visible: false };

  handleClick = () => {
    // this.showModal();
    const {
      form: { setFieldsValue },
      data,
      dispatch,
      details
    } = this.props;

    if(Object.keys(data).length > 0){
      setFieldsValue({
        caseid: data.caseid,
        detail: data.detail,
        time: data.time,
        location: data.location,
        gatherMethod: data.gatherMethod,
        leaveMethod: data.leaveMethod,
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

  render() {
    const { visible } = this.state;
    const {
      text,
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
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
          点击详情
        </Button>
        <Modal
          title="查看案件详情"
          visible={visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确定"
          cancelText="取消"
        >
          <Form id="modalDetails">
              <FormItem 
                  {...formItemLayout}
                  label="案件编号："
                >
                {getFieldDecorator('caseid', {
                  rules: [{ required: true }],
                })(<Input readOnly/>)}
              </FormItem>
              <FormItem 
                 {...formItemLayout}
                 label="详细案情："
                >
                {getFieldDecorator('detail', {
                  rules: [{ required: true }],
                })(<textarea rows={3} cols={40}></textarea>)}
              </FormItem>
              <FormItem 
                  {...formItemLayout}
                  label="时间："
                >
                {getFieldDecorator('time', {
                  rules: [{ required: true }],
                })(<Input readOnly/>)}
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="地点："
              >
                {getFieldDecorator('location', {
                  rules: [{ required: true }],
                })(<Input readOnly/>)}
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="足迹采集方式："
              >
                {getFieldDecorator('gatherMethod', {
                  rules: [{ required: true }],
                })(<Input readOnly/>)}
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="足迹遗留方式："
              >
                {getFieldDecorator('leaveMethod', {
                  rules: [{ required: true }],
                })(<Input readOnly/>)}
              </FormItem>
            </Form>
        </Modal>
      </span>
    );
  }
}

export default ModalConclude;