import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form } from 'antd';
import './BasicInfo.less';

@connect(({ info, loading }) => ({
  info,
  loading: loading.models.info,
}))
class BasicInfo extends React.Component {
  render() {
    const {
      info: { info },
      loading,
    } = this.props;
    return (
      <div>
        <h3>BasicInfo</h3>
        <button
          onClick={() => {
            window.location.href = '/user/login';
          }}
        >
          点击跳转
        </button>
        <br />
        <button
          onClick={() => {
            this.props.dispatch(
              routerRedux.push({
                pathname: '/infoquery/basic-result',
                state: { id: 10 },
                query: { name: 'xiaoqian' },
              })
            );
          }}
        >
          点击携带参数跳转
        </button>
        <br/>
        <button
          onClick={() => {
            var ele = document.getElementsByClassName('ant-avatar')[0];
            var target=ele.nextSibling;
            alert(target.innerHTML);
          }}
        >
          点击alert
        </button>
      </div>
    );
  }
}
export default BasicInfo;
