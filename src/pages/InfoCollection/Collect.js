import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert,Input, Icon, Upload, message, Button,DatePicker} from 'antd';
import styles from './Collect.less';
import Avatar from './Avatar';
import './Avatar.less';

const { TextArea } = Input;
function onChange(date, dateString) {
  console.log(date.format(), dateString);
}

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
          <div className={styles.contentMain}>
              <div className={styles.upload}>
                <Avatar id="upload" />
              </div>
              <div className={styles.normalStyle}>
                  <div className={styles.leftSide}>详细案情：</div>
                  <div className={styles.leftContent}>
                      <TextArea placeholder="请描述案件详情" autosize />
                  </div>
              </div>
              <div className={styles.normalStyle}>
                  <div className={styles.leftSide}>时间: </div>
                  <div className={styles.leftContent}>
                    <DatePicker onChange={onChange} />
                  </div>
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
              <img id='test' style={{width:200,height:200}} />
          </div>
        </div> 
      </div>
    );
  }
}
export default Collect;
