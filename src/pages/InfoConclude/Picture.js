import { Upload, Icon, message } from 'antd';
import { connect } from 'dva';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isLt2M;
}
function getRootPath(){
  let url=location.href;
  const pathname=window.location.pathname;
  const index=url.indexOf(pathname);
  let rootPath=url.slice(0,index);
  return rootPath;
}
@connect(({ conclude }) => ({
  
}))
class Picture extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    const { dispatch, id } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        const obj = {};
        obj[id] = imageUrl;
        this.setState({
          imageUrl,
          loading: false,
        })
        dispatch({
          type:"conclude/getImageUrl",
          payload:obj,
        });
      });
    }
  }
  componentDidMount(){
    
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">点击上传图片</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    const id = this.props.id;
    const rootPath=getRootPath();
    return (
        <div id={id}>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={rootPath}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="点击重新上传图片" /> : uploadButton}
            </Upload>
        </div>
    );
  }
}
export default Picture;