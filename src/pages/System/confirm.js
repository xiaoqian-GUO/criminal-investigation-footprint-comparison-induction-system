import { Modal } from 'antd';
// 使用 Modal.confirm() 可以快速弹出确认框，onCancel/onOk 返回 promise 可以延迟关闭
function deleteConfirm() {
  Modal.confirm({
    title: '确认要删除该用户吗？',
    content: '点击确认后该用户将被注销',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}

function lockConfirm() {
  Modal.confirm({
    title: '确认要锁定该用户吗？',
    content: '点击确认后该用户将被锁定',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}

export default { deleteConfirm, lockConfirm };
