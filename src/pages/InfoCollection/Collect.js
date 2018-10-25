import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert,Input, Icon, Upload, message, Button} from 'antd';
import styles from './Collect.less';
import Avatar from './Avatar';
import './Avatar.less';

class Collect extends React.Component {
  constructor(){
    super();
  }
  onChange=(info)=> {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  render() {
    const fileList = [];
    const props1 = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [...fileList],
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
          <h1>other</h1>

          <Upload {...props1}>
            <Button>
              <Icon type="upload" /> 点击上传足迹照片
            </Button>
          </Upload>
          <br />
          <div className={styles.upload}>
            <Avatar id="upload" />
          </div>
          
          <br/>
          <button onClick={()=>{
              var ele=document.getElementById('upload');
              var img=ele.getElementsByTagName('img');
              if(img.length>0){
                  alert(img[0].getAttribute('src'));
                  var im=document.getElementById('test');
                  im.src=img[0].getAttribute('src');
              }

          }}>点击输出图片的base64编码</button>
          <br/>
          <br/>
          <img id='test' style={{width:200,height:200}} />
        </div> 
      </div>
    );
  }
}
export default Collect;
