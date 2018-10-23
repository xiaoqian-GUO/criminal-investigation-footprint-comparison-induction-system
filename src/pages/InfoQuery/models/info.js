export default {
  namespace: 'info',

  state: {},

  effects: {},

  reducers: {},
  subscriptions: {
    //订阅数据源
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log('location');
        console.log(location);
      });
    },
  },
};
