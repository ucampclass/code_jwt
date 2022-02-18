const {
  altaUsuario,
  buscarUsuarioDB,
  listarUsuariosActivos,
} = require('../bussinesLogic/usuarios.bl');
const { comparePassword } = require('../helpers/password.utils');
const { generateToken } = require('../helpers/jwt.utils');

const response = { messages: '', success: true, data: [] };

const nuevoUsuario = async (req, res) => {
  try {
    const { nombre, username, email, password } = req.body;
    const dtoUsuario = { nombre, username, email, password };
    response.data = await altaUsuario(dtoUsuario);

    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    response.messages = 'Lo sentimos, hubo un error';
    response.success = false;
    response.data = [];
    return res.status(500).json(response);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const findUser = await buscarUsuarioDB(username);
    if (!findUser) {
      (response.messages = 'Usuario no encontrado'), (response.success = false);
      response.data = [];

      return res.status(404).json(response);
    }

    const compare = comparePassword(password, findUser.password);

    if (!compare) {
      response.messages = 'Password invalido';
      response.success = false;
      response.data = [];

      return res.status(400).json(response);
    }

    const token = await generateToken(findUser);
    response.messages = 'ok..';
    response.success = true;
    response.data = { user: findUser, token };
    return res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(response);
  }
};

const obtieneUsuarios = async (req, res) => {
  try {
    response.data = await listarUsuariosActivos();
    response.messages = 'ok';
    response.success = true;

    return res.json(response);
  } catch (error) {
    console.log(error);

    response.data = [];
    response.messages = 'Hubo un error';
    response.success = true;
    return res.status(500).json(response);
  }
};

module.exports = { nuevoUsuario, signin, obtieneUsuarios };
