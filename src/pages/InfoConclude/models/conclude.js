import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { startConclude } from '@/services/user';

export default {
  namespace: 'conclude',
  state: {
    imageUrl: {},
    concludeText: "",
  },

  effects: {
    //开始归纳对比
    *startConclude({ payload }, { call, put }) {
      const response = yield call(startConclude, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'getConcludeResult',
          payload: response.concludeText,
        });
      } else {
        message.error("归纳对比失败！");
      }
    },

  },

  reducers: {
    getImageUrl(state, action){
        let { imageUrl } = state;
        Object.assign(imageUrl, action.payload);
        console.log(imageUrl);
        return {
            ...state,
            imageUrl:imageUrl,
        };
    },
    getConcludeResult(state, action){
      let { concludeText } = state;
      concludeText = action.payload;
      return {
          ...state,
          concludeText: concludeText
      };
  },


  },
};
