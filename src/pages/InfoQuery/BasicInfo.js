import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert, Input, Icon,Button} from 'antd';
import styles from './BasicInfo.less';
import Avatar from './Avatar';

// 将blob对象转化为baseurl
function getBase64Other(blob, callback) {
  var a = new FileReader();
  a.onload = function(e) {callback(e.target.result);};
  a.readAsDataURL(blob);
}

@connect(({ info }) => ({
  imageUrl: info.imageUrl,
  backgroundImg: info.backgroundImg
}))
class BasicInfo extends React.Component {
  state = {
    caseid: '',
    base64ImageUrl: '',
  }
  handleChange = (e) => {
    this.setState({
      caseid: e.target.value,
    });
  }
  handleClick = ()  => {
    const { caseid } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'info/fetchCasePic',
      payload: {
        caseid: caseid
      }
    });  
  }
  componentDidMount = () => {
    const {
      backgroundImg
    } = this.props;
    // 如果拿到了响应 就改变state
    if(backgroundImg){
      var objectUrl = window.URL.createObjectURL(backgroundImg);
      this.refImage.src = objectUrl;
      this.refImage.style.display = "inline";
      this.refImage.onload = function(){
        window.URL.revokeObjectURL(backgroundImg);
      };
      // getBase64Other(backgroundImg, base64ImageUrl => {
      //   //console.log(base64ImageUrl);
      //   this.setState({
      //     base64ImageUrl: base64ImageUrl
      //   })
      // });
    }
  }
  componentWillUnmount = () => {
    // 清空blob对象
    const { dispatch } = this.props;
    dispatch({
      type: 'info/changeBgImg',
      payload: ""
    });
  }
  render() {
    const {
      imageUrl,
      loading,
      backgroundImg
    } = this.props;

    if(backgroundImg){
      var objectUrl = window.URL.createObjectURL(backgroundImg);
      this.refImage.src = objectUrl;
      this.refImage.style.display = "inline";
      this.refImage.onload = function(){
        window.URL.revokeObjectURL(backgroundImg);
      };
    }
    //console.log(backgroundImg);

    // getBase64Other(backgroundImg, base64ImageUrl => {
    //   //console.log(base64ImageUrl);
    //   this.setState({
    //     base64ImageUrl: base64ImageUrl
    //   })
    // });
    //}
    const { base64ImageUrl } = this.state;
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.headerNav}>
            <Breadcrumb>
              <Breadcrumb.Item><a href="/infoquery/basic-info">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>足迹信息查询</Breadcrumb.Item>
              <Breadcrumb.Item>查询案件所属足迹图片</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.headerH}>
            <h2>足迹查询</h2>
          </div>
        </div>
        <div className={styles.contentBody}>
            <div className={styles.flexBody}>
              <div className={styles.upload}>
                  <div>
                    <div>
                      <p className={styles.centerPara}>案件编号：</p>
                      <Input type="text" value={ this.state.caseid } onChange={this.handleChange}/>
                    </div>
                    <br/>
                    <div>
                      <div className={styles.marginAuto}>
                          <Button type="primary" onClick={this.handleClick}>开始查询</Button>
                      </div>
                    </div>
                  </div>
              </div>
              <div className={styles.centerContent}>
                  <div><Icon type="arrow-right"/></div>
              </div>
              <div className={styles.rightContent}>
                  
                  <div id="result" className={styles.result}>
                    {
                      backgroundImg? (<img ref = { node => this.refImage = node} className={styles.imgStyle} src='' style={{ display: 'inline'}} />): 
                      (<img ref = { node => this.refImage = node} className={styles.imgStyle} src='' style={{ display: 'none'}} />)
                    }
                  </div>
              </div>

            </div>
        </div>
        <br/>
      </div>
    );
  }
}
export default BasicInfo;
