import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Breadcrumb, Alert, Input, Icon, Button } from 'antd';

import ReactDOM from 'react-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import styles from './BasicInfo.less';
import Avatar from './Avatar';

// 将blob对象转化为baseurl
function getBase64Other(blob, callback) {
  var a = new FileReader();
  a.onload = function(e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
}

@connect(({ info }) => ({
  imageUrl: info.imageUrl,
  backgroundImg: info.backgroundImg,
}))
class BasicInfo extends React.Component {
  state = {
    caseid: '',
    base64ImageUrl: '',
    src: null, //图片裁剪state
    crop: {
      aspect: 1,
      width: 20,
      x: 0,
      y: 0,
    },
  };
  handleChange = e => {
    this.setState({
      caseid: e.target.value,
    });
  };
  handleClick = () => {
    const { caseid } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'info/fetchCasePic',
      payload: {
        imageid: caseid,
      },
    });
  };
  componentDidMount = () => {
    const { backgroundImg } = this.props;
    // 如果拿到了响应 就改变state
    if (backgroundImg) {
      var objectUrl = window.URL.createObjectURL(backgroundImg);
      this.refImage.src = objectUrl;
      this.refImage.style.display = 'inline';
      this.refImage.onload = function() {
        window.URL.revokeObjectURL(backgroundImg);
      };
      // getBase64Other(backgroundImg, base64ImageUrl => {
      //   //console.log(base64ImageUrl);
      //   this.setState({
      //     base64ImageUrl: base64ImageUrl
      //   })
      // });
    }
  };
  componentWillUnmount = () => {
    // 清空blob对象
    const { dispatch } = this.props;
    dispatch({
      type: 'info/changeBgImg',
      payload: '',
    });
  };

  // 下面是图片裁剪的部分函数
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => this.setState({ src: reader.result }));
      console.log(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(this.imageRef, pixelCrop, 'newFile.jpeg');
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        console.log(blob);
        let imgFile = new window.File([blob], fileName, { type: 'image/jpeg' });
        console.log(imgFile);
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }
  //end

  render() {
    const { imageUrl, loading, backgroundImg } = this.props;

    if (backgroundImg) {
      var objectUrl = window.URL.createObjectURL(backgroundImg);
      this.refImage.src = objectUrl;
      this.refImage.style.display = 'inline';
      this.refImage.onload = function() {
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
    const { base64ImageUrl, crop, croppedImageUrl, src } = this.state;
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.headerNav}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/infoquery/basic-info">首页</a>
              </Breadcrumb.Item>
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
                  <p className={styles.centerPara}>图像编号：</p>
                  <Input type="text" value={this.state.caseid} onChange={this.handleChange} />
                </div>
                <br />
                <div>
                  <div className={styles.marginAuto}>
                    <Button type="primary" onClick={this.handleClick}>
                      开始查询
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.centerContent}>
              <div>
                <Icon type="arrow-right" />
              </div>
            </div>
            <div className={styles.rightContent}>
              <div id="result" className={styles.result}>
                {backgroundImg ? (
                  <img
                    ref={node => (this.refImage = node)}
                    className={styles.imgStyle}
                    src=""
                    style={{ display: 'inline' }}
                  />
                ) : (
                  <img
                    ref={node => (this.refImage = node)}
                    className={styles.imgStyle}
                    src=""
                    style={{ display: 'none' }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.App}>
            <div>
              <input type="file" onChange={this.onSelectFile} />
            </div>
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            )}
            {croppedImageUrl && (
              <div>
                <img
                  className="img"
                  alt="Crop"
                  style={{ maxWidth: '100%', width: 100, height: 100 }}
                  src={croppedImageUrl}
                />
              </div>
            )}
          </div>
        </div>
        <br />
      </div>
    );
  }
}
export default BasicInfo;
