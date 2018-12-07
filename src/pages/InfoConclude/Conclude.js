import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert, Input, Icon, Button, message} from 'antd';
import styles from './Conclude.less';
import Picture from './Picture';

@connect(({ conclude }) => ({
  imageUrl:conclude.imageUrl,
  concludeText: conclude.concludeText,
}))
class Conclude extends React.Component {
  constructor(){
    super();
    this.state = {
      imageid1: '',
      imageid2: ''
    };
  }
  handleChange1 = (e) => {
    this.setState({
      imageid1: e.target.value
    });
  }
  handleChange2 = (e) => {
    this.setState({
      imageid2: e.target.value
    });
  }
  // 点击开始对比归纳
  handleClick = () => {
    const { dispatch, imageUrl } = this.props;
    const len = Object.keys(imageUrl).length;
    const { imageid1, imageid2 } = this.state;
    if(len == 2){
      const payload = {
        'imageid1': imageid1,
        'imageid2': imageid2,
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
              <Breadcrumb.Item>案件归纳对比</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.headerH}>
            <h2>案件归纳</h2>
          </div>
        </div>
        <div className={styles.contentBody}>
            <div className={styles.flexBody}>
              <div className={styles.rightContent}>
                <div>
                  <Picture id="upload1" />
                  <p className={styles.centerPara}>案件编号：</p>
                  <Input type="text" value={ this.state.imageid1 } onChange={this.handleChange1}/>
                </div>
              </div>

              <div className={styles.centerContent}>
                  <div>
                    <div className={styles.flexStyle}><Icon type="swap"/></div>
                    <div><Button type="primary" onClick={this.handleClick}>归纳对比</Button></div>
                  </div>
              </div>

              <div className={styles.rightContent}>
                <div>
                  <Picture id="upload2" />
                  <p className={styles.centerPara}>案件编号：</p>
                  <Input type="text" value={ this.state.imageid2 } onChange={this.handleChange2}/>
                </div>
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
