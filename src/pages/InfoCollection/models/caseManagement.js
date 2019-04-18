import {
  queryAllCases,
  delCase,
  updateCaseInfo,
  addCase,
  queryCasesByInfo,
} from '@/services/user';
import { Modal } from 'antd';

export default {
  namespace: 'caseManagement',

  state: {
    data: [], // 辅助筛查时的备份
    filterData: [],
  },

  effects: {
    // 获取所有案件列表
    *fetchAllCases(_, { call, put }) {
      const response = yield call(queryAllCases);

      yield put({
        type: 'saveCases',
        payload: response,
      });
    },
    // 添加单个案件
    *addCase({ payload }, { call, put }) {
      const data = yield call(queryAllCases);
      // 判断有没有重复的 caseid
      if (data.every(item => item.caseid !== payload.caseid)) {
        const response = yield call(addCase, payload);
        if (response.status === 0) {
          Modal.success({ title: 'This is a success message', content: '新建案件成功' });
          yield put({
            type: 'addNewCase',
            payload,
          });
        } else {
          Modal.error({ title: 'This is an error message', content: '新建案件失败' });
        }
      } else {
        Modal.error({ title: 'This is an error message', content: '用户名重复' });
      }
    },
    // 编辑案件基本信息
    *editCaseInfo({ payload }, { call, put }) {
      const response = yield call(updateCaseInfo, payload);
      if (response.status === 0) {
        Modal.success({ title: 'This is a success message', content: '更新案件成功' });
        yield put({
          type: 'updateCaseInfo',
          payload,
        });
      } else {
        Modal.error({ title: 'This is an error message', content: '更新案件失败' });
      }
    },
    // 删除某个用户
    *deleteCase({ payload }, { call, put }) {
      const response = yield call(delCase, payload);
      if (response.status === 0) {
        Modal.success({ title: 'This is a success message', content: '删除案件成功' });
        yield put({
          type: 'delCase',
          payload,
        });
      } else {
        Modal.error({ title: 'This is an error message', content: '删除案件失败' });
      }
    },
    //案件查询
    *queryCases({ payload }, { call, put }) {
      const response = yield call(queryCasesByInfo, payload);
      yield put({
        type: 'searchCase',
        payload: response,
      });
    },
  },

  reducers: {
    saveCases(state, { payload }) {
      return {
        ...state,
        data: payload,
        filterData: payload,
      };
    },
    updateCase(state, { payload }) {
      const { filterData, data } = state;
      const newData = data.map(
        item => (item.caseid === payload.caseid ? { ...item, ...payload } : item)
      );
      const updatedFilterData = filterData.map(
        item => (item.caseid === payload.caseid ? { ...item, ...payload } : item)
      );
      return {
        ...state,
        data: newData,
        filterData: updatedFilterData,
      };
    },
    updateCaseInfo(state, { payload }) {
      const { filterData, data } = state;
      const newData = data.map(
        item => (item.caseid === payload.caseid ? { ...item, ...payload } : item)
      );
      const updatedFilterData = filterData.map(
        item => (item.caseid === payload.caseid ? { ...item, ...payload } : item)
      );
      return {
        ...state,
        data: newData,
        filterData: updatedFilterData,
      };
    },
    addNewCase(state, { payload }) {
      const { data } = state;
      const newData = data.concat({
        ...payload,
      });
      return {
        ...state,
        data: newData,
        filterData: newData,
      };
    },
    delCase(state, { payload: delKey }) {
      const { data, filterData } = state;
      const newDate = data.filter(item => item.caseid !== delKey['caseid']);
      const updatedFilterData = filterData.filter(item => item.caseid !== delKey['caseid']);
      return {
        ...state,
        data: newDate,
        filterData: updatedFilterData,
      };
    },
    searchCase(state, { payload }) {
      return {
        ...state,
        filterData: payload,
      };
    },
  },
};
