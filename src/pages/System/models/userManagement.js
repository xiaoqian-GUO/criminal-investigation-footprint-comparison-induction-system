import {
  query as queryUsers,
  deleteUser as delUser,
  updateUserInfo,
  addUser,
  lockUser,
} from '@/services/user';
import { Modal } from 'antd';

export default {
  namespace: 'userManagement',

  state: {
    data: [], // 辅助筛查时的备份
    filterData: [],
  },

  effects: {
    // 获取所有用户
    *fetchAllUsers(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'saveUsers',
        payload: JSON.parse(response),
      });
    },
    // 添加单个用户
    *addUser({ payload }, { call, put }) {
      const data = yield call(queryUsers);
      // 判断有没有重复的 username
      if (data.every(item => item.username !== payload.username)) {
        const response = yield call(addUser, payload);
        if (response.status === 'ok') {
          Modal.success({ title: 'This is a success message', content: '新建成功' });
          yield put({
            type: 'addNewUser',
            payload,
          });
        } else {
          Modal.error({ title: 'This is an error message', content: '新建失败' });
        }
      } else {
        Modal.error({ title: 'This is an error message', content: '用户名重复' });
      }
    },
    // 编辑
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
    // 锁定某个用户
    *lockUser({ payload }, { call, put }) {
      const response = yield call(lockUser, payload);
      if (response.status === 'ok') {
        if (payload.locked) {
          Modal.success({ title: 'This is a success message', content: '解除锁定成功' });
        } else {
          Modal.success({ title: 'This is a success message', content: '锁定成功' });
        }
        yield put({
          type: 'handleLock',
          payload,
        });
      } else {
        Modal.error({ title: 'This is an error message', content: '操作失败' });
      }
    },
    // 删除某个用户
    *deleteUser({ payload }, { call, put }) {
      const response = yield call(delUser, payload);
      if (response.status === 'ok') {
        Modal.success({ title: 'This is a success message', content: '删除成功' });
        yield put({
          type: 'delUser',
          payload,
        });
      } else {
        Modal.error({ title: 'This is an error message', content: '删除失败' });
      }
    },
  },

  reducers: {
    saveUsers(state, { payload }) {
      return {
        ...state,
        data: payload,
        filterData: payload,
      };
    },
    updateUser(state, { payload }) {
      const { filterData, data } = state;
      const newData = data.map(item => (item.username === payload.username ? payload : item));
      const updatedFilterData = filterData.map(
        item => (item.username === payload.username ? payload : item)
      );
      return {
        ...state,
        data: newData,
        filterData: updatedFilterData,
      };
    },
    addNewUser(state, { payload }) {
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
    delUser(state, { payload: delKey }) {
      const { data, filterData } = state;
      const newDate = data.filter(item => item.username !== delKey);
      const updatedFilterData = filterData.filter(item => item.username !== delKey);
      return {
        ...state,
        data: newDate,
        filterData: updatedFilterData,
      };
    },
    searchUser(state, { payload: searchKey }) {
      const { data } = state;
      const filterData = data.filter(item => {
        const reg = new RegExp(searchKey, 'i');
        const index = item.username.search(reg);
        return index !== -1;
      });
      return {
        ...state,
        filterData,
      };
    },
    handleLock(state, { payload }) {
      const { data } = state;
      const newData = data.map(item => {
        if (item.username === payload.username) {
          item.locked = !item.locked;
        }
        return item;
      });
      return {
        ...state,
        data: newData,
        filterData: newData,
      };
    },
  },
};
