const argon2 = require('argon2');

const hashPassword = async (password) => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
};

const verifyPassword = async (hash, password) => {
  return await argon2.verify(hash, password);
};

module.exports = { hashPassword, verifyPassword };