const tokenBlackList = [];

const addTokenToBlackList = (token) => {
  tokenBlackList.push(token);
};

const isTokenBlackListed = (token) => {
  tokenBlackList.includes(token);
};
module.exports = {
  tokenBlackList,
  addTokenToBlackList,
  isTokenBlackListed,
};
