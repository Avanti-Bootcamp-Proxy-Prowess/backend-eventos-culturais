const { verify } = require('jsonwebtoken');
const authConfig = require('../configs/auth');

function Autenticacao(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'JWT token não informado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: user_id,
    };
    // request.usuario = {
    //   id: user_id,
    // };

    return next();
  } catch (error) {
    console.error(error); 
    return response.status(401).json({ message: 'Token JWT inválido' });
  }
}

module.exports = Autenticacao;
