const { encryptPassword } = require('../helpers/password.utils');
const {
  nuevoUsuario,
  buscarPorUsuario,
  listarUsuarios,
} = require('../repository/usuarios.repository');

const altaUsuario = async (objUsuario) => {
  objUsuario.password = encryptPassword(objUsuario.password);
  const addUser = await nuevoUsuario(objUsuario);

  return addUser;
};

const buscarUsuarioDB = async (email) => {
  return await buscarPorUsuario(email);
};

const listarUsuariosActivos = async () => {
  return await listarUsuarios();
};

module.exports = { altaUsuario, buscarUsuarioDB, listarUsuariosActivos };
