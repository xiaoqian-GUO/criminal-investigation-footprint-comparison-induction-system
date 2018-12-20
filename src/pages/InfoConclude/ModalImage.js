import React from 'react';
import { Button, Modal, Form, Input, message, Spin } from 'antd';
import { connect } from 'dva';
import styles from './ModalImage.less';
import {
  queryImg,
} from '@/services/user';

const FormItem = Form.Item;

@connect(({ info }) => ({
}))
class ModalImage extends React.Component {
  state = { 
    visible: false,
    loading: false
  };

  handleClick = () => {
    //this.showModal();
    this.setState({
      loading: true
    });
    const {
      dispatch,
      imageid,
    } = this.props;
    const obj = {
      imageid: imageid
    }
    this.showModal();
    var rsu=queryImg( obj );
    rsu.then(( response )=>{
      message.success("查看图片成功！");
      // 将正在加载的标志去掉
      this.setState({
        loading: false
      });
      var objectUrl = window.URL.createObjectURL(response);
      this.modalImage.src = objectUrl;
      this.modalImage.onload = function(){
        window.URL.revokeObjectURL(response);
      };
    }).catch( () => {
      message.error("查看图片失败！");
    });
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
      imageid,
    } = this.props;
    const title = "查看图片：" + imageid;
    return (
      <span>
        <a
          href="javascript:void(0);"
          onClick={() => {
            this.handleClick();
          }}
        >
          { imageid }
        </a>
          <Modal
            title={title}
            visible={visible}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText="确定"
            cancelText="取消"
          >
            <div className={styles.imgStyle}>
              <Spin tip="Loading..." spinning={this.state.loading} size="large">
                  <img  src="/white.png" ref={ node => this.modalImage = node}/>
              </Spin> 
            </div>
          </Modal>
      </span>
    );
  }
}

export default ModalImage;