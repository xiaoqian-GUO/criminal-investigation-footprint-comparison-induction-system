import { query as queryUsers, queryCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    users:{},
    allInfo:{},
    rightContent:{},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    addMethod(state, action) {
      return {
        ...state,
        users: action.payload,
        allInfo:{},
        rightContent:{
          name:action.payload.currentUser,
          avatar:"https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        },
      };
    },
    modifyUserInfo(state,action){
      return {
        ...state,
        allInfo: action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
  subscriptions:{
    setup({dispatch, history}){
      history.listen((location)=>{
        console.log('location:');
        console.log(location);
        if(Object.keys(location.query).length>0){
          dispatch({
            type:'addMethod',
            payload:location.query||{},
          });
        }
        
      });
    },
  },
};
