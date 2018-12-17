import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { collectPrintInfo } from '@/services/user';

export default {
  namespace: 'collect',
  state: {
        status: false
  },

  effects: {
     // 采集足迹信息
     *uploadPicture({ payload }, { call, put }) {
        const response = yield call(collectPrintInfo, payload);
        if (response.status === 0) {
          message.success("足迹信息上传成功");
          yield put({
            type: 'changeStatus',
            payload: true,
          });
          location.href = "/#/infocollection/success";
        } else {
          message.error("足迹信息上传失败");
        }
      },
  },

  reducers: {
    changeStatus( state, action ){
        return {
            ...state,
            status: action.payload
        };
    },
  },
};
