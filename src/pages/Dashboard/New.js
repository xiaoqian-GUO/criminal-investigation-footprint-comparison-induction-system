import React from 'react';
import styles from './New.less';
import { Button } from 'antd';
import fetch from 'dva/fetch';

class Text extends React.Component {
  render() {
    var ele = document.getElementsByClassName('ant-menu');
    return (
      <div>
        <p>hello world</p>
        <Button
          onClick={() => {
            alert('ok');
            console.log(ele.length);
          }}
        >
          点击
        </Button>
      </div>
    );
  }
}
export default Text;
