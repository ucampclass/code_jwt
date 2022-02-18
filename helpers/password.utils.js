const bcrypt = require('bcrypt');

const comparePassword = (password, passwordDB) => {
  return bcrypt.compareSync(password, passwordDB);
};

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};
module.exports = { comparePassword, encryptPassword };
