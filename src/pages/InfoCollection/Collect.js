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

var oc, pc, newImg, num=0, rate=1, haveRotate=0, zoomWidth=250, zoomHeight=100;   // 是否点击过旋转

function dataURLtoFile(dataurl, filename) {
  //将base64转换为文件
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

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
    isCrop: false,
    finalSrc: null,
    zoomImg: false
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    // 将canvas换成img
    const { croppedImageUrl } = this.state;
    if(!croppedImageUrl){
      var width = 100* zoomWidth/zoomHeight;
      var height = 100;
      console.log(width, height);
      console.log(this.finalImg);
      this.finalImg.style.width = width+"px";
      this.finalImg.style.height = height+"px";
    }
    this.setState({
      visible: false,
      zoomImg: false,
      isCrop: false
    });
    haveRotate=0;  //点击次数归零
    num=0;
    rate=1;
  };

  hideModalCrop = () => {
    
    var width = 100* zoomWidth/zoomHeight;
    var height = 100;
    console.log(width, height);
    console.log(this.finalImg);
    this.finalImg.style.width = width+"px";
    this.finalImg.style.height = height+"px";
    
    this.setState({
      visible: false,
      zoomImg: false,
      isCrop: false
    });
    haveRotate=0;  //点击次数归零
    num=0;
    rate=1;
  };

  handleOk = () => {
    //关闭visible，并且修改src和finalSrc
    const { croppedImageUrl } = this.state;
    if(croppedImageUrl){
      this.setState({
        src: croppedImageUrl,
        finalSrc: croppedImageUrl,
        visible: false,
        zoomImg: false,
        isCrop: false
      });
    }
    else{
      var width = 100* zoomWidth/zoomHeight;
      var height = 100;
      console.log(width, height);
      console.log(this.finalImg);
      this.finalImg.style.width = width+"px";
      this.finalImg.style.height = height+"px";

      this.setState({
        visible: false,
        zoomImg: false,
        isCrop: false
      });
    }
  }

  handleFileClick = e => {
    console.log('click');
    console.log(e.target.files);
    e.target.value = "";
  }
  // canvas和js结合实现图片旋转
  change = (obj) => {
    console.log(obj);
    if(haveRotate == 0){
      haveRotate = 1;
      oc=document.createElement('canvas');
      pc=oc.getContext('2d');
      oc.width = obj.width;
      oc.height = obj.height; 
      pc.drawImage(obj,0,0);
    }
    console.log('num:', num);
    switch(num){
        case 1:
            oc.width = obj.height;
            oc.height = obj.width;
            pc.rotate(90*Math.PI/180);
            pc.drawImage(obj,0,-obj.height);
            zoomWidth = obj.height;
            zoomHeight = obj.width;
        break;
        case 2:
            oc.width = obj.width ;
            oc.height = obj.height;
            pc.rotate(180*Math.PI/180);
            pc.drawImage(obj,-obj.width,-obj.height);
        break;
        case 3:
            oc.width = obj.height;
            oc.height = obj.width;
            pc.rotate(270*Math.PI/180);
            pc.drawImage(obj,-obj.width,0);
            zoomWidth = obj.height;
            zoomHeight = obj.width;
        break;
        case 0:
            oc.width = obj.width ;
            oc.height = obj.height;
            pc.rotate(360*Math.PI/180);
            pc.drawImage(obj,0,0);
        break;
    }   
  }
  leftClick = (e) => {
    var obj = this.Img;
    num--;
    if(num<0){
        num=3;  
    }
    num=3;
    this.change(obj); 
    var dataURL = oc.toDataURL("image/jpeg");
    //var file = dataURLtoFile(dataURL, 'left.jpeg');
    this.setState({
      src: dataURL,
      finalSrc: dataURL
    });
  }
  rightClick = (e) => {
    var obj = this.Img;
    num++;
    if(num>3){
        num=0;  
    }
    num=1;
    this.change(obj);
    var dataURL = oc.toDataURL("image/jpeg");
    //var file = dataURLtoFile(dataURL, 'left.jpeg');
    this.setState({
      src: dataURL,
      finalSrc: dataURL
    });
  }
  // end

  onSelectFile = e => {
    const { src } = this.state;
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>{
        console.log('load');
        //console.log(reader.result );
        this.setState({ src: reader.result, finalSrc: reader.result })
        this.showModal();
        //处理canvas
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // canvas旋转

  // end canvas旋转

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
  // 点击裁剪，设置isCrop为true，并将旋转之后的图片设置为src，并在裁剪完成后，将croppedImageUrl赋给finalSrc
  cropClick = (e) => {
    this.setState({
      isCrop: true
    });
  }

  componentDidUpdate() {
    // 发生更新时，执行的方法
    // 只在每次第一次缩放图片时，调用，并且在hideModal时，将zoomImg置为false
    const { src, zoomImg, visible } = this.state;
    console.log('这是第几次更新');
    if(src && visible && !zoomImg){
      console.log('这是第几次符合要求');
      setTimeout(() => {
          console.log('这是第几次执行');
          var obj = this.Img;
          var height = 472;
          var width = 472* obj.width/obj.height;
          zoomWidth = width;
          zoomHeight = height;
          // 重新生成图片
          var cvs = document.createElement('canvas');
          cvs.width = width;
          cvs.height = height;     //计算等比缩小后图片宽高
          var ctx = cvs.getContext('2d');
          ctx.drawImage(obj, 0, 0, cvs.width, cvs.height);
          var newImageData = cvs.toDataURL('image/jpeg');
          //console.log(newImageData);
          this.setState({
            src: newImageData,
            finalSrc: newImageData,
            zoomImg: true
          });
      },0);
    }
  }

  render() {
    const { crop, croppedImageUrl, src, visible, finalSrc, isCrop } = this.state;
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
    let modalConfig;
    if (crop) {
      modalConfig = {
        onCancel: this.hideModalCrop,
      };
    } else {
      modalConfig = {
        onCancel: this.hideModal,
      };
    }
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
              {finalSrc && (
                <div className={styles.previewMain}>
                  <img className="img" alt="Crop" style={{ maxWidth: "100%", width: 250, height: 100 }} src={finalSrc} ref={node => this.finalImg = node}/>
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
          onOk={this.handleOk}
          onCancel={modalConfig.onCancel}
          okText="确定"
          cancelText="取消" 
        >
        {isCrop && src && (
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
        {isCrop && croppedImageUrl && (
          <div className={styles.preview}>
            <img className="img" alt="Crop" style={{ maxWidth: "100%", width: 250, height: 100 }} src={croppedImageUrl} />
          </div>
        )}
         {!isCrop && src && (
          <div style={{textAlign: "center"}}>
            <img className={styles.controlImg} src={src} ref={ node => this.Img=node}/>
          </div>
        )}
        {!isCrop && src && (
          <div className={styles.preview}>
            <span onClick={this.cropClick} style={{marginRight: 20}}><a><Icon type="scissor" />裁剪</a></span>
            <span onClick={this.leftClick} style={{marginRight: 20}}><a><Icon type="undo" />旋转</a></span>
            <span onClick={this.rightClick} style={{}}><a>旋转<Icon type="redo" /></a></span>
          </div>
        )}
        </Modal>
      </div>
    );
  }
}

export default Collect;
