export default {
  namespace: 'info',

  state: {
    imageUrl: "",
  },

  effects: {},

  reducers: {
    getImageUrl(state, action) {
      return {
        imageUrl: action.payload,
      };
    },

  },
  subscriptions: {
    //订阅数据源
    
  },
};
