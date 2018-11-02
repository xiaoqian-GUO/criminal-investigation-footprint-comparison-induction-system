import React from 'react';
import { Button, Modal } from 'antd';

class LocalizedModal extends React.Component {
  state = { visible: false };

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
    return (
      <span>
        <Button type="primary" onClick={this.showModal}>
          Edit
        </Button>
        <Modal
          title="Modal"
          visible={visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
      </span>
    );
  }
}

export default LocalizedModal;
