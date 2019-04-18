import React, { PureComponent } from 'react';
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
  Cascader,
  Modal
} from 'antd';
import ReactDOM from "react-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styles from './Collect.less';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

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
class Collect extends React.Component {
  // 图片裁剪部分函数
  state = {
    src: null,
    fileObj: null,
    crop: {
      aspect: 2.5,
      width: 60,
      x: 0,
      y: 0
    },
    visible: false,
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

  handleFileClick = e => {
    console.log('click');
    console.log(e.target.files);
    e.target.value = "";
  }

  onSelectFile = e => {
    console.log('change');
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>{
        console.log('load');
        this.setState({ src: reader.result })
        this.showModal();
      });
      console.log(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        console.log(blob);
        let imgFile = new window.File([blob], fileName, {type: "image/jpeg"});
        console.log(imgFile);
        this.setState({
          fileObj: imgFile
        })
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }
  // end
  handleClick = e => {
    this.props.form.validateFields((err, values) => {
      console.log(values);
    });
    this.props.form.setFieldsValue({
      gatherMethod: '明胶提取'
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { fileObj } = this.state;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('表单数据: ', values);
        var form_data = new FormData();
        // form_data.append('footprintimage', values['footprintimage'][0]['originFileObj']);
        form_data.append('footprintimage', fileObj);
        form_data.append('caseid', values['caseid']);
        form_data.append('imageformat', values['imageformat']);
        form_data.append('leavePosition', values['leavePosition']);
        form_data.append('leaveMethod', values['leaveMethod']);
        form_data.append('gatherMethod', values['gatherMethod']);
        console.log(form_data.get('time'));
        console.log('imageObj', form_data.get('footprintimage'));
        console.log(form_data);
        dispatch({
          type: 'collect/uploadPicture',
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
    const { crop, croppedImageUrl, src, visible } = this.state;
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
              <Breadcrumb.Item>足迹信息采集</Breadcrumb.Item>
              <Breadcrumb.Item>信息采集页</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.headerH}>
            <h2>足迹信息采集</h2>
          </div>
        </div>
        <div className={styles.contentBody}>
          <div className={styles.contentMain}>
            <Form id="form" onSubmit={this.handleSubmit} encType="multipart/form-data">
            {/*
              <FormItem {...formItemLayout} label="上传图片">
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
          */}
              {croppedImageUrl && (
                <div className={styles.previewMain}>
                  <img className="img" alt="Crop" style={{ maxWidth: "100%", width: 250, height: 100 }} src={croppedImageUrl} />
                </div>
              )}
              <FormItem {...formItemLayout} label="上传图片：">
                {getFieldDecorator('footprintimage', {
                  getValueFromEvent: this.onSelectFile,
                  rules: [{ required: false }],
                })(<input type="file" onClick={this.handleFileClick}/>)}
              </FormItem>
              
              <FormItem {...formItemLayout} label="文件格式：">
                {getFieldDecorator('imageformat', {
                  rules: [{ required: true }],
                })(<Input />)}
              </FormItem>

              <FormItem {...formItemLayout} label="所属案件编号：">
                {getFieldDecorator('caseid', {
                  rules: [{ required: true }],
                })(<Input maxLength="14" placeholder="编号规则：单位 + 年份 + 月份 + 序号"/>)}
              </FormItem>
             
              <FormItem {...formItemLayout} label="足迹遗留部位：">
                {getFieldDecorator('leavePosition', {
                  rules: [{ required: true }],
                })(<Input />)}
              </FormItem>
             
              <FormItem {...formItemLayout} label="足迹遗留方式：">
                {getFieldDecorator('leaveMethod', {
                  initialValue: '灰尘足迹',
                  rules: [{ required: true }],
                })(
                  <Select>
                    <Option value="灰尘足迹">灰尘足迹</Option>
                    <Option value="泥土足迹">泥土足迹</Option>
                    <Option value="水渍足迹">水渍足迹</Option>
                    <Option value="雪地足迹">雪地足迹</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="足迹提取方式：">
                {getFieldDecorator('gatherMethod', {
                  initialValue: '照相提取',
                  rules: [{ required: true }],
                })(
                  <Select>
                    <Option value="照相提取">照相提取</Option>
                    <Option value="明胶提取">明胶提取</Option>
                    <Option value="静电吸附提取">静电吸附提取</Option>
                    <Option value="足迹采集仪提取">足迹采集仪提取</Option>
                  </Select>
                )}
              </FormItem>
              
              <FormItem wrapperCol={{ span: 12, offset: 12 }}>
                <Button type="primary" htmlType="submit">
                  提交足迹信息
                </Button>
              </FormItem>
            </Form>
          </div>
          <br />
        </div>
        <Modal
          title="编辑图片"
          visible={visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确定"
          cancelText="取消" 
        >
        {src && (
          <div style={{textAlign: "center"}}>
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              className={styles.centerModal}
            />
          </div>
        )}
        {croppedImageUrl && (
          <div className={styles.preview}>
            <img className="img" alt="Crop" style={{ maxWidth: "100%", width: 250, height: 100 }} src={croppedImageUrl} />
          </div>
        )}
        </Modal>
      </div>
    );
  }
}

export default Collect;
