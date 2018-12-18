import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { connect } from 'dva';
import styles from './ModalImage.less';
import {
  queryImg,
} from '@/services/user';

const FormItem = Form.Item;

@connect(({ info }) => ({
}))
class ModalImage extends React.Component {
  state = { visible: false };

  handleClick = () => {
    //this.showModal();
    const {
      dispatch,
      imageid,
    } = this.props;
    const obj = {
      imageid: imageid
    }
    var rsu=queryImg( obj );
    rsu.then(( response )=>{
      this.showModal();
      var objectUrl = window.URL.createObjectURL(response);
      this.modalImage.src = objectUrl;
      this.modalImage.onload = function(){
        window.URL.revokeObjectURL(response);
      };
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
          title="查看图片"
          visible={visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确定"
          cancelText="取消"
        >
          <div className={styles.imgStyle}>
            <img  src="/yay.jpg" ref={ node => this.modalImage = node}/>
          </div>
        </Modal>
      </span>
    );
  }
}

export default ModalImage;