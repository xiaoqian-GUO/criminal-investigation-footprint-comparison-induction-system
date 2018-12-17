import {
  queryCases,
  querySimilarCases,
  queryCaseImg,
  getBase64Other
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
      const { imageid } = payload;
      if( imageid ){
        const response = yield call(queryCaseImg, payload);
        yield put({
          type: 'changeBgImg',
          payload: response,
        });
      }
      else{
        yield put({
          type: 'changeBgImg',
          payload: '',
        });
      }
    },

  },

  reducers: {
    getImageUrl(state, action) {
      return {
        imageUrl: action.payload,
      };
    },
    getAllCases( state, action ){
      var arr = action.payload.filter(function( item ){
        return item !==  null;
      });
      return {
        ...state,
        cases: arr,
        filterCases: arr,
      }
    },
    searchCases( state, action ) {
      const { caseid: value } = action.payload;
      const reg = new RegExp(value, 'i');
      const newArr = state.cases.filter(function( item ){
        const index = item.caseid.toString().search(reg);
        return index !== -1;
      });
      return {
        ...state,
        filterCases: newArr
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
