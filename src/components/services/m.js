let listUser = [];

const m = {
  saveList: (arr) => {
    arr.forEach(item => {
      if(!m.isUniq(item._id)) listUser.push(item);
    });
    m.cacheList();
    return listUser;
  },
  cacheList: () => {
    let json = JSON.stringify(listUser);
    localStorage.setItem('list', json)
  },
  getFromCahe: () => {
    let json = localStorage.getItem('list');
    return JSON.parse(json);
  },
  isUniq: (_id) => (listUser && listUser.length > 0 && listUser.find(user => _id === user._id )),
  updateItem: (item) => {
    listUser && listUser.length > 0 && listUser.forEach(user => {
      if(item._id === user._id) {
        user = item;
      }
    });
    m.cacheList();
  },
  getInstagramNick: (ig) => {
    let arr = ig.split('/');
    return arr && arr.length > 0 && arr[arr.length - 1]
  }
};

window.m = m;
listUser = m.getFromCahe() || [];
export default m;
