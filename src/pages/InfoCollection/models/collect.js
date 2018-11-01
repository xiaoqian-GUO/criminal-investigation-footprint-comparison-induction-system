import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'collect',
  state: {
    imageUrl:"",
    hasPic:false,
  },

  effects: {
    
  },

  reducers: {
    getImageUrl(state, action){
        return {
            ...state,
            imageUrl:action.payload,
            hasPic:false,
        };
    },
    clearImageUrl(state, action){
        return {
            imageUrl:"",
            hasPic:false,
        };
    },
    appearWarning(state, action){
        return {
            ...state,
            hasPic:true,
        };
    },


  },
};
