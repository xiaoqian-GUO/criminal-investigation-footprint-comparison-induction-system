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
        //通过localStorage来存储用户信息
        if(location.query.name){
          if(localStorage.getItem('username')){
            localStorage.setItem('username',location.query.name);
          }
          else{
            localStorage.setItem('username',location.query.name);
          }
        }
      });
    },
  },
};
