/**
 * Example Service File
 */

const initModels = require('../../models/init-models');
const models = initModels(require('../../lib/db'));

let mockUserData = [
  {
    firstName: 'Dwight',
    lastName: 'Schrute',
    email: 'dschrute@dundermifflinpaperco.com',
  },
  {
    firstName: 'Michael',
    lastName: 'Scott',
    email: 'mscott@dundermifflinpaperco.com',
  },
];

module.exports.bulkSeed = async () => {
  await models.users.bulkCreate(mockUserData);
};

module.exports.getAllUsers = async () => {
  return models.users.findAll();
};

module.exports.getUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) gxApiErrorNotFound('There was no user found by that id!');
  return models.users.findByPk(userId);
};

module.exports.createUser = async (user) => {
  return models.users.create(user);
};

module.exports.updateUser = async (user, userId) => {
  const getUser = await User.findByPk(userId);
  if (!getUser) gxApiErrorNotFound('There was no user found by that id!');
  return getUser.update(user);
};

module.exports.deleteUser = async (userId) => {
  const user = await models.users.findByPk(userId);
  if (!user) gxApiErrorNotFound('There was no user found by that id!');
  return await models.users.destroy({ where: { id: userId } });
};
