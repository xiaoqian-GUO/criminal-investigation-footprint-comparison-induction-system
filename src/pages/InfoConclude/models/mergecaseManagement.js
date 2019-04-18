import {
  queryAllMergeCases,
  delMergeCase,
  updateMergeCaseInfo,
  queryMergeCasesByInfo,
} from '@/services/user';
import { Modal } from 'antd';

export default {
  namespace: 'mergecaseManagement',

  state: {
    data: [], // 辅助筛查时的备份
    filterData: [],
  },

  effects: {
    // 获取所有串并案列表
    *fetchAllMergeCases(_, { call, put }) {
      const response = yield call(queryAllMergeCases);

      yield put({
        type: 'saveMergeCases',
        payload: response,
      });
    },
    // 编辑串并案基本信息
    *editMergeCaseInfo({ payload }, { call, put }) {
      const response = yield call(updateMergeCaseInfo, payload);
      if (response.status === 0) {
        Modal.success({ title: 'This is a success message', content: '更新串并案成功' });
        yield put({
          type: 'updateMergeCaseInfo',
          payload,
        });
      } else {
        Modal.error({ title: 'This is an error message', content: '更新串并案失败' });
      }
    },
    // 删除某个串并案
    *deleteMergeCase({ payload }, { call, put }) {
      const response = yield call(delMergeCase, payload);
      if (response.status === 0) {
        Modal.success({ title: 'This is a success message', content: '删除串并案成功' });
        yield put({
          type: 'delMergeCase',
          payload,
        });
      } else {
        Modal.error({ title: 'This is an error message', content: '删除串并案失败' });
      }
    },
    //串并案查询
    *queryMergeCases({ payload }, { call, put }) {
      const response = yield call(queryMergeCasesByInfo, payload);
      yield put({
        type: 'searchMergeCase',
        payload: response,
      });
    },
  },

  reducers: {
    saveMergeCases(state, { payload }) {
      return {
        ...state,
        data: payload,
        filterData: payload,
      };
    },
    updateMergeCaseInfo(state, { payload }) {
      const { filterData, data } = state;
      const newData = data.map(
        item => (item.mergecaseid === payload.mergecaseid ? { ...item, ...payload } : item)
      );
      const updatedFilterData = filterData.map(
        item => (item.mergecaseid === payload.mergecaseid ? { ...item, ...payload } : item)
      );
      return {
        ...state,
        data: newData,
        filterData: updatedFilterData,
      };
    },
    delMergeCase(state, { payload: delKey }) {
      const { data, filterData } = state;
      const newDate = data.filter(item => item.mergecaseid !== delKey['mergecaseid']);
      const updatedFilterData = filterData.filter(item => item.mergecaseid !== delKey['mergecaseid']);
      return {
        ...state,
        data: newDate,
        filterData: updatedFilterData,
      };
    },
    searchMergeCase(state, { payload }) {
      return {
        ...state,
        filterData: payload,
      };
    },
  },
};
