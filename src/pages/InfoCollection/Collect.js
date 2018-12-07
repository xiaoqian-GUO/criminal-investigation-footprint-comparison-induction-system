import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Input, InputNumber, Button, Upload, 
  Icon, message, DatePicker
} from 'antd';
import styles from './Collect.less';
import moment from 'moment';


const FormItem = Form.Item;

function getRootPath(){
  let url=location.href;
  const pathname=window.location.pathname;
  const index=url.indexOf(pathname);
  let rootPath=url.slice(0,index);
  return rootPath;
}

function getFormatTime( time ){
  var date = new Date(time.format());
  var currentTime = date.getFullYear() + "-" + (parseInt(date.getMonth())+1) + "-" + date.getDay();
  var str = date.toLocaleTimeString();
  if(str.indexOf('PM') !== -1){
    var tmp = str.indexOf(':');
    var tmpStr = str.slice(0,tmp);
    str = "" + ( parseInt(tmpStr) + 12 ) + str.slice(tmp);
  }
  currentTime += " " + str.slice(0,-3);
  return currentTime;
}
@connect(({ collect }) => ({
  status: collect.status,         //用来表示当前的上传状态， 如果上传成功就清空form表单
}))
@Form.create()
class Collect extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('表单数据: ', values);
        var form_data = new FormData();
        form_data.append('detail', values['detail']);
        form_data.append('footprintimage', values['footprintimage'][0]['originFileObj']);
        form_data.append('imageformat', values['imageformat']);
        form_data.append('leaveMethod', values['leaveMethod']);
        form_data.append('location', values['location']);
        form_data.append('time', getFormatTime(values['time']));
        form_data.append('gatherMethod', values['gatherMethod']);
        console.log(form_data.get('time'));
        dispatch({
          type: 'collect/uploadPicture',
          payload: form_data,
        });
      }
      else{
        message.error("信息不完整，不允许提交！");
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const rootPath=getRootPath();
    const {
      form: { setFieldsValue, getFieldDecorator },
      status
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
    const config = {
      rules: [{ type: 'object', required: true, message: '请选择时间!' }],
    };
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.headerNav}>
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>足迹信息采集</Breadcrumb.Item>
              <Breadcrumb.Item>采集页</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.headerH}>
            <h2>足迹采集</h2>
          </div>
        </div>
        <div className={styles.contentBody}>
          <div className={styles.contentMain}>
          <Form id="form" onSubmit={this.handleSubmit} encType="multipart/form-data">
            <FormItem
                {...formItemLayout}
                label="上传图片"
              >
                {getFieldDecorator('footprintimage', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload name="logo" action={rootPath} listType="picture">
                    <Button>
                      <Icon type="upload" /> 点击上传图片
                    </Button>
                  </Upload>
                )}
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
                {getFieldDecorator('time', config)(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="地点："
              >
                {getFieldDecorator('location', {
                  rules: [{ required: true }],
                })(<Input />)}
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="足迹采集方式："
              >
                {getFieldDecorator('gatherMethod', {
                  rules: [{ required: true }],
                })(<Input />)}
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="足迹遗留方式："
              >
                {getFieldDecorator('leaveMethod', {
                  rules: [{ required: true }],
                })(<Input />)}
              </FormItem>
              <FormItem 
                {...formItemLayout}
                label="文件格式："
              >
                {getFieldDecorator('imageformat', {
                  rules: [{ required: true }],
                })(<Input />)}
              </FormItem>
              <FormItem
                wrapperCol={{ span: 12, offset: 6 }}
              >
                <Button type="primary" htmlType="submit">提交足迹信息</Button>
              </FormItem>
            </Form>       
          </div>
          <br/>
        </div>
      </div>
    );
  }
}

export default Collect;