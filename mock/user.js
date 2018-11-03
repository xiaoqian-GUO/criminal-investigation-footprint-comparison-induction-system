// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: '',
    username: 'userName',
    address: '西安电子科技大学',
    phone: '18392089875',
    userId: '00000001',
    email: '1843887878@163.com',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      username: 'John Brown',
      password: '123456',
      authority: 'admin',
    },
    {
      key: '2',
      username: 'John',
      password: '123456',
      authority: 'user',
    },
    {
      key: '3',
      username: ' Brown',
      password: '123456',
      authority: 'admin',
    },
    {
      key: '4',
      username: ' daipeng',
      password: '123456',
      authority: 'admin',
    },
    {
      key: '5',
      username: ' xiaoqian',
      password: '123456',
      authority: 'admin',
    },
  ],

  'POST /api/addUser': {
    status: 'ok',
  },

  'POST /api/deleteUser': {
    status: 'ok',
  },

  'POST /api/lockUser': {
    status: 'ok',
  },

  'POST /api/login/account': (req, res) => {
    const { password, userName } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      currentAuthority: 'guest',
    });
  },

  'POST /api/login/accountlogin': (req, res) => {
    const { password, userName } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: '0',
        currentUser: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: '1',
        currentUser: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      currentAuthority: 'guest',
    });
  },

  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'POST /api/getCurrentUser': (req, res) => {
    const { currentUser } = req.body;
    if (currentUser === 'admin') {
      res.send({
        name: 'daipeng',
        username: 'admin',
        insitution: '西安电子科技大学',
        phone: '18392089875',
        userId: '1610122398',
        email: '1843887878@163.com',
        // name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        // email: 'antdesign@alipay.com',
      });
    } else {
      res.send({
        name: 'user',
        username: 'xiaoqian',
        insitution: '西安电子科技大学',
        phone: '18392089875',
        userId: '1610122604',
        email: '18392089875@163.com',
        // name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        // email: 'antdesign@alipay.com',
      });
    }
  },
  'POST /api/updateUserInfo': (req, res) => {
    const { username } = req.body;
    if (username) {
      res.send({
        status: 'ok',
      });
    } else {
      res.send({
        status: 'error',
      });
    }
  },
  'POST /api/updatePwd': (req, res) => {
    const { newpwd, username } = req.body;
    if (username) {
      res.send({
        status: 'ok',
      });
    } else {
      res.send({
        status: 'error',
      });
    }
  },
  'POST /api/collectPrintInfo': (req, res) => {
    const { footprintImage, detail, time, location, gatherMethod, leaveMethod } = req.body;
    if (footprintImage && detail && time && location && gatherMethod && leaveMethod) {
      res.send({
        status: 'ok',
      });
    } else {
      res.send({
        status: 'error',
      });
    }
  },
};
