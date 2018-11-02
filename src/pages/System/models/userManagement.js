import { query as queryUsers } from '@/services/user';

export default {
  namespace: 'userManagement',

  state: {
    data: [],
  },

  effects: {
    // 获取所有用户
    *fetchAllUsers(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'saveUsers',
        payload: response,
      });
    },
  },

  reducers: {
    saveUsers(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
  },
};
