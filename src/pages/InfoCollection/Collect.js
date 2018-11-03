import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert, Input, Icon, Upload, message, Button, DatePicker } from 'antd';
import styles from './Collect.less';
import Avatar from './Avatar';
import moment from 'moment';
import { collectPrintInfo } from '@/services/user';
import './Avatar.less';

const { TextArea } = Input;
function onChange(date, dateString) {
  console.log(date.format(), dateString);
}

@connect(({ collect }) => ({
  imageUrl: collect.imageUrl,
  hasPic: collect.hasPic,
}))
class Collect extends React.Component {
  constructor() {
    super();
    this.state = {
      picture: false,
      details: false,
      detailsText: '',
      time: false,
      timeText: null,
      location: false,
      locationText: '',
      collectType: false,
      collectTypeText: '',
      leaveType: false,
      leaveTypeText: '',
      buttonText: '提交足迹信息',
      result: false,
      resultStatus: true,
    };
  }
  onDetailsChange = e => {
    var bol = e.target.value == '' ? true : false;
    this.setState({
      detailsText: e.target.value,
      details: bol,
    });
  };
  onTimeChange = date => {
    if (!date) {
      this.setState({
        timeText: date,
        time: true,
      });
    } else {
      this.setState({
        timeText: date,
        time: false,
      });
    }
  };
  onLocationChange = e => {
    var bol = e.target.value == '' ? true : false;
    this.setState({
      locationText: e.target.value,
      location: bol,
    });
  };
  onCollectTypeChange = e => {
    var bol = e.target.value == '' ? true : false;
    this.setState({
      collectTypeText: e.target.value,
      collectType: bol,
    });
  };
  onLeaveTypeChange = e => {
    var bol = e.target.value == '' ? true : false;
    this.setState({
      leaveTypeText: e.target.value,
      leaveType: bol,
    });
  };
  onChange = info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  render() {
    const { imageUrl, dispatch } = this.props;
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

            {this.props.hasPic ? (
              <div className={styles.errorStyle}>
                * 请上传图片
                {/* <Alert />message="请上传图片" type="error" showIcon /> */}
              </div>
            ) : null}

            <div className={styles.textareaStyle}>
              <div className={styles.leftSide}>详细案情：</div>
              <div className={styles.leftContent}>
                <TextArea
                  rows={4}
                  placeholder="请描述案件详情"
                  value={this.state.detailsText}
                  onChange={this.onDetailsChange}
                />
              </div>
            </div>

            {this.state.details ? (
              <div className={styles.errorStyle}>
                * 请填写案件详情
                {/* <Alert message="请填写案件详情" type="error" showIcon /> */}
              </div>
            ) : null}

            <div className={styles.normalStyle}>
              <div className={styles.leftSide}>时间: </div>
              <div className={styles.leftContent}>
                <DatePicker
                  onChange={this.onTimeChange}
                  format="YYYY-MM-DD"
                  value={this.state.timeText}
                />
              </div>
            </div>

            {this.state.time ? (
              <div className={styles.errorStyle}>
                * 请选择时间
                {/* <Alert message="请选择时间" type="error" showIcon /> */}
              </div>
            ) : null}

            <div className={styles.normalStyle}>
              <div className={styles.leftSide}>地点: </div>
              <div className={styles.leftContent}>
                <Input
                  placeholder="请输入作案地点"
                  value={this.state.locationText}
                  onChange={this.onLocationChange}
                />
              </div>
            </div>

            {this.state.location ? (
              <div className={styles.errorStyle}>
                * 请填写地点
                {/* <Alert message="请填写地点" type="error" showIcon /> */}
              </div>
            ) : null}

            <div className={styles.normalStyle}>
              <div className={styles.leftSide}>足迹采集方式: </div>
              <div className={styles.leftContent}>
                <Input
                  placeholder="请输入足迹采集方式"
                  value={this.state.collectTypeText}
                  onChange={this.onCollectTypeChange}
                />
              </div>
            </div>

            {this.state.collectType ? (
              <div className={styles.errorStyle}>
                * 请填写足迹采集方式
                {/* <Alert message="请填写足迹采集方式" type="error" showIcon /> */}
              </div>
            ) : null}

            <div className={styles.normalStyle}>
              <div className={styles.leftSide}>足迹遗留方式: </div>
              <div className={styles.leftContent}>
                <Input
                  placeholder="请输入足迹遗留方式"
                  value={this.state.leaveTypeText}
                  onChange={this.onLeaveTypeChange}
                />
              </div>
            </div>

            {this.state.leaveType ? (
              <div className={styles.errorStyle}>
                * 请填写足迹遗留方式
                {/* <Alert message="请填写足迹遗留方式" type="error" showIcon /> */}
              </div>
            ) : null}

            {this.state.result ? (
              this.state.resultStatus ? (
                <div className={styles.alertStyle}>
                  <div className={styles.leftSide} />
                  <div className={styles.leftContent}>
                    <Alert message="足迹信息上传成功" type="success" showIcon banner />
                  </div>
                </div>
              ) : (
                <div className={styles.alertStyle}>
                  <div className={styles.leftSide} />
                  <div className={styles.leftContent}>
                    <Alert
                      message="足迹信息上传失败，请重新点击上传"
                      type="error"
                      showIcon
                      banner
                    />
                  </div>
                </div>
              )
            ) : null}

            <div className={styles.normalStyle}>
              <div className={styles.leftSide} />
              <div className={styles.leftContent}>
                <Button
                  type="primary"
                  onClick={() => {
                    const rsu = this.state.result;
                    const { dispatch } = this.props;
                    if (rsu) {
                      if (this.state.resultStatus) {
                        // 如果是信息提交成功，则再次点击按钮就是清除图片
                        // var ele=document.getElementById('upload');
                        // var img=ele.getElementsByTagName('img');
                        // if(img.length>=0){
                        //     var ele=img[0];
                        //     var par=ele.parentNode;
                        //     //par.removeChild(ele);
                        //     ele.src="";
                        // }

                        // 调用dispatch清除图片
                        dispatch({
                          type: 'collect/clearImageUrl',
                        });
                        this.setState({
                          picture: false,
                          details: false,
                          detailsText: '',
                          time: false,
                          timeText: null,
                          location: false,
                          locationText: '',
                          collectType: false,
                          collectTypeText: '',
                          leaveType: false,
                          leaveTypeText: '',
                          result: false,
                          buttonText: '提交足迹信息',
                          resultStatus: true,
                        });
                      } else {
                        // 如果为false，则表示上传失败，可以点击重新上传
                        //获取表单所有数据，重新发送请求
                        const {
                          detailsText: detail,
                          timeText: time,
                          locationText: location,
                          collectTypeText: gatherMethod,
                          leaveTypeText: leaveMethod,
                        } = this.state;
                        let milliseconds = time ? new Date(time.format()).getTime() : null;
                        const params = {
                          footprintImage: imageUrl,
                          detail,
                          time: milliseconds,
                          location,
                          gatherMethod,
                          leaveMethod,
                        };

                        let res = collectPrintInfo(params);
                        res.then(response => {
                          if (response.status === 'ok') {
                            this.setState({
                              picture: false,
                              details: false,
                              time: false,
                              location: false,
                              collectType: false,
                              leaveType: false,
                              result: true,
                              buttonText: '再次采集足迹',
                              resultStatus: true,
                            });
                          } else {
                            this.setState({
                              result: true,
                              buttonText: '再次点击上传',
                              resultStatus: false,
                            });
                          }
                          // end:信息上传失败
                        });
                      }
                    } else {
                      //首先判断是否信息输入完整
                      let bolPic = false,
                        bolDetils = false,
                        bolTime = false,
                        bolLoc = false,
                        bolCol = false,
                        bolLeave = false;
                      // var ele=document.getElementById('upload');
                      // var img=ele.getElementsByTagName('img');

                      if (imageUrl === '') {
                        dispatch({
                          type: 'collect/appearWarning',
                        });
                      }
                      var {
                        detailsText,
                        timeText,
                        locationText,
                        leaveTypeText,
                        collectTypeText,
                      } = this.state;
                      if (!detailsText) {
                        bolDetils = true;
                      }
                      if (!timeText) {
                        bolTime = true;
                      }
                      if (!locationText) {
                        bolLoc = true;
                      }
                      if (!collectTypeText) {
                        bolCol = true;
                      }
                      if (!leaveTypeText) {
                        bolLeave = true;
                      }
                      if (bolPic || bolDetils || bolTime || bolLoc || bolCol || bolLeave) {
                        this.setState({
                          picture: bolPic,
                          details: bolDetils,
                          time: bolTime,
                          location: bolLoc,
                          collectType: bolCol,
                          leaveType: bolLeave,
                          result: false,
                          buttonText: '提交足迹信息',
                          resultStatus: true,
                        });
                      } else {
                        //如果信息输入完整，再去上传信息，若信息也上传保存成功，则清空表单，再次上传
                        //获取表单所有数据，发送请求
                        const {
                          detailsText: detail,
                          timeText: time,
                          locationText: location,
                          collectTypeText: gatherMethod,
                          leaveTypeText: leaveMethod,
                        } = this.state;
                        let milliseconds = time ? new Date(time.format()).getTime() : null;
                        const params = {
                          footprintImage: imageUrl,
                          detail,
                          time: milliseconds,
                          location,
                          gatherMethod,
                          leaveMethod,
                        };

                        let res = collectPrintInfo(params);
                        res.then(response => {
                          if (response.status === 'ok') {
                            this.setState({
                              picture: false,
                              details: false,
                              time: false,
                              location: false,
                              collectType: false,
                              leaveType: false,
                              result: true,
                              buttonText: '再次采集足迹',
                              resultStatus: true,
                            });
                          } else {
                            this.setState({
                              result: true,
                              buttonText: '再次点击上传',
                              resultStatus: false,
                            });
                          }
                          // end:信息上传失败
                        });
                      }
                    }
                  }}
                >
                  {this.state.buttonText}
                </Button>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}
export default Collect;
