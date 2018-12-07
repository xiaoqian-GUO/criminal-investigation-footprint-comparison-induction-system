import {
  queryCases,
  querySimilarCases,
  queryCaseImg
} from '@/services/user';
import { message } from 'antd';
export default {
  namespace: 'info',

  state: {
    imageUrl: "",
    backgroundImg: "",
    cases: [],
    filterCases: []
  },

  effects: {
     // 获取所有管辖案件
     *fetchAllCases(_, { call, put }) {
      const response = yield call(queryCases);
      yield put({
        type: 'getAllCases',
        payload: response,
      });
    },
    // 获取所有管辖案件
    *fetchAllSimilarCases({ payload }, { call, put }) {
      const caseid = payload['caseid'];
      if( caseid ){
        const response = yield call(querySimilarCases, payload);
        yield put({
          type: 'searchCases',
          payload: response,
        });
      }
      else{
        const response = yield call(queryCases);
        yield put({
          type: 'getAllCases',
          payload: response,
        });
      }
    },
     // 根据caseid查询足迹所属照片
     *fetchCasePic({ payload }, { call, put }) {
      const response = yield call(queryCaseImg, payload);
      yield put({
        type: 'changeBgImg',
        payload: response,
      });
    },

  },

  reducers: {
    getImageUrl(state, action) {
      return {
        imageUrl: action.payload,
      };
    },
    getAllCases( state, action ){
      return {
        ...state,
        cases: action.payload,
        filterCases: action.payload
      }
    },
    searchCases( state, action ) {
      return {
        ...state,
        filterCases: action.payload
      }
    },
    changeBgImg( state, action ) {
      return {
        ...state,
        backgroundImg: action.payload
      }
    }

  },
  subscriptions: {
    //订阅数据源
    
  },
};
