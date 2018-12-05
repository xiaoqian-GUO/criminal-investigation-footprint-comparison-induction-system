import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert,Input, Icon, Button, message} from 'antd';
import styles from './Conclude.less';
import Picture from './Picture';

@connect(({ conclude }) => ({
  imageUrl:conclude.imageUrl,
  concludeText: conclude.concludeText,
}))
class Conclude extends React.Component {
  constructor(){
    super();
  }
  // 点击开始对比归纳
  handleClick = () => {
    const { dispatch, imageUrl } = this.props;
    const len = Object.keys(imageUrl).length;
    if(len == 2){
      const payload = {
        'imageid1': imageUrl['upload1'],
        'imageid2': imageUrl['upload2'],
      };
      dispatch({
        type: 'conclude/startConclude',
        payload: payload,
      });
    }
    else{
      message.error("请选择两张图片！");
    }
  }
  //经归纳对比，两个案件相似度不高，不建议并案！
  render() {
    const { concludeText } = this.props;
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.headerNav}>
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>足迹比对归纳</Breadcrumb.Item>
              <Breadcrumb.Item>足迹归纳页</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.headerH}>
            <h2>归纳结果</h2>
          </div>
        </div>
        <div className={styles.contentBody}>
            <div className={styles.flexBody}>
              <div className={styles.rightContent}>
                <Picture id="upload1" />
              </div>

              <div className={styles.centerContent}>
                  <div>
                    <div className={styles.flexStyle}><Icon type="swap"/></div>
                    <div><Button type="primary" onClick={this.handleClick}>归纳对比</Button></div>
                  </div>
              </div>

              <div className={styles.rightContent}>
                <Picture id="upload2" />
              </div>

            </div>
            
            <div className={styles.concludeResult}>
              <div>
                  <div className={styles.para}>对比归纳结果: </div>
                  <div className={styles.conclude}>
                      <p>{concludeText}</p>
                  </div>
              </div>
            </div>
        </div> 
      </div>
    );
  }
}
export default Conclude;
