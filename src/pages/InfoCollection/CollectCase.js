import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Form,
  Breadcrumb,
  Input,
  InputNumber,
  Button,
  Upload,
  Icon,
  message,
  DatePicker,
  Select,
  Cascader
} from 'antd';
import styles from './CollectCase.less';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
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


function getRootPath() {
  let url = location.href;
  const pathname = window.location.pathname;
  const index = url.indexOf(pathname);
  let rootPath = url.slice(0, index);
  return rootPath;
}

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
@connect(({ collect }) => ({
  status: collect.status, //用来表示当前的上传状态， 如果上传成功就清空form表单
}))
@Form.create()
class CollectCase extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('表单数据: ', values);
        var form_data = new FormData();
        form_data.append('caseid', values['caseid']);
        form_data.append('caseStatus', values['caseStatus']);
        form_data.append('time', getFormatTime(values['time']));
        form_data.append('location', values['location']);
        form_data.append('institution', values['institution'].join(' \/ '));
        form_data.append('detail', values['detail']);
        form_data.append('caseType', values['caseType']);
        form_data.append('enterType', values['enterType']);
        form_data.append('stolen', values['stolen']);
        form_data.append('persons', values['persons']);
        console.log(form_data.get('time'));
        console.log('imageObj', form_data.get('footprintimage'));
        dispatch({
          type: 'collect/uploadCase',
          payload: form_data,
        });
      } else {
        message.error('信息不完整，不允许提交！');
      }
    });
  };
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  render() {
    const rootPath = getRootPath();
    const {
      form: { setFieldsValue, getFieldDecorator },
      status,
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
              <Breadcrumb.Item>案件信息采集</Breadcrumb.Item>
              <Breadcrumb.Item>信息采集页</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.headerH}>
            <h2>案件信息采集</h2>
          </div>
        </div>
        <div className={styles.contentBody}>
          <div className={styles.contentMain}>
            <Form id="form" onSubmit={this.handleSubmit} encType="multipart/form-data">
              <FormItem {...formItemLayout} label="案件编号：">
                {getFieldDecorator('caseid', {
                  rules: [{ required: true }],
                })(<Input maxLength="14" placeholder="编号规则：单位 + 年份 + 月份 + 序号"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="案件状态：">
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
              <FormItem {...formItemLayout} label="案发时间：">
                {getFieldDecorator('time', config)(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="案发地点：">
                {getFieldDecorator('location', {
                  rules: [{ required: true }],
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="所属单位：">
                {getFieldDecorator('institution', {
                  initialValue: ['黑龙江省公安厅', '哈尔滨市公安局', '南岗分局'],
                  rules: [{ type: 'array', required: true }],
                })(<Cascader options={options} changeOnSelect placeholder="请选择所属单位" />)}
              </FormItem>

              <FormItem {...formItemLayout} label="简要案情：">
                {getFieldDecorator('detail', {
                  rules: [{ required: true }],
                })(<textarea rows={3} cols={60} className={styles.textareaStyle} />)}
              </FormItem>
              <FormItem {...formItemLayout} label="案件类别：">
                {getFieldDecorator('caseType', {
                  initialValue: '入室盗窃案',
                  rules: [{ required: true }],
                })(
                  <Select>
                    <Option value="入室盗窃案">入室盗窃案</Option>
                    <Option value="扒窃案">扒窃案</Option>
                    <Option value="故意杀人案">故意杀人案</Option>
                    <Option value="抢劫案">抢劫案</Option>
                    <Option value="强奸案">强奸案</Option>
                    <Option value="其他盗窃案">其他盗窃案</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="侵入方式：">
                {getFieldDecorator('enterType', {
                  initialValue: '技术开锁',
                  rules: [{ required: true }],
                })(
                  <Select>
                    <Option value="技术开锁">技术开锁</Option>
                    <Option value="撬门入室">撬门入室</Option>
                    <Option value="和平入室">和平入室</Option>
                    <Option value="撬窗入室">撬窗入室</Option>
                    <Option value="翻窗入室">翻窗入室</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="被盗物品：">
                {getFieldDecorator('stolen', {
                  rules: [{ required: true }],
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label="作案人数：">
                {getFieldDecorator('persons', {
                  rules: [{ required: true }],
                })(<Input />)}
              </FormItem>
              
              <FormItem wrapperCol={{ span: 12, offset: 12 }}>
                <Button type="primary" htmlType="submit">
                  提交案件信息
                </Button>
              </FormItem>
            </Form>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default CollectCase;
