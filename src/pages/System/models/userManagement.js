import {
  query as queryUsers,
  deleteUser as delUser,
  updateUserInfo,
  addUser,
} from '@/services/user';
import { Modal } from 'antd';

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
    *addUser({ payload }, { call, put }) {
      const response = yield call(addUser, payload);
      if (response.status === 'ok') {
        Modal.success({ title: 'This is a success message', content: '新建成功' });
        yield put({
          type: 'addNewUser',
          payload,
        });
        // TODO 生产环境无法模拟 key 需重新获取
        // yield put({ type:'fetchAllUsers'});
      } else {
        Modal.error({ title: 'This is an error message', content: '新建失败' });
      }
    },
    *editUser({ payload }, { call, put }) {
      const response = yield call(updateUserInfo, payload);
      if (response.status === 'ok') {
        Modal.success({ title: 'This is a success message', content: '更新成功' });
        yield put({
          type: 'updateUser',
          payload,
        });
      } else {
        Modal.error({ title: 'This is an error message', content: '更新失败' });
      }
    },
    // 删除某个用户
    *deleteUser({ payload }, { call, put }) {
      const response = yield call(delUser, payload);
      if (response.status === 'ok') {
        Modal.success({ title: 'This is a success message', content: '删除成功' });
      } else {
        Modal.error({ title: 'This is an error message', content: '删除失败' });
      }
      // 删除操作再次请求加载数据
      yield put({
        type: 'fetchAllUsers',
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
    updateUser(state, { payload }) {},
    addNewUser(state, { payload }) {
      const { data } = state;
      const newData = data.concat({
        key: new Date().getTime(),
        ...payload,
      });
      return {
        ...state,
        data: newData,
      };
    },
  },
};
