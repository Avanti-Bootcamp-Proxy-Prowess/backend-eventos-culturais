const prismaClient = require("../database/PrismaClient.js");
const { compare } = require("bcryptjs");
const { hash } = require("bcryptjs");

class UsuariosController {
  async criarUsuario(request, response) {
    const { nome, email, password } = request.body;

    try {
      const checkUserExists = await prismaClient.usuario.findUnique({
        where: { email }
      });

      if (checkUserExists) {
        return response.status(400).json({ message: "Este e-mail já está em uso." });
      }

      const hashedPassword = await hash(password, 8);

      await prismaClient.usuario.create({
        data: {
          nome,
          email,
          password: hashedPassword
        }
      });

      return response.status(201).json();
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  // async update(request, response) {
  //   const { nome, email, password, old_password } = request.body;
  //   const user_id = request.usuario.id;

  //   try {
  //     const user = await prismaClient.usuario.findUnique({
  //       where: { id: user_id }
  //     });

  //     if (!user) {
  //       return response.status(404).json({ message: "Usuário não encontrado." });
  //     }

  //     const userWithUpdatedEmail = await prismaClient.usuario.findUnique({
  //       where: { email }
  //     });

  //     if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
  //       return response.status(400).json({ message: "Este e-mail já está em uso." });
  //     }

  //     user.nome = nome ?? user.nome;
  //     user.email = email ?? user.email;

  //     if (password && !old_password) {
  //       return response.status(400).json({ message: "Você deve informar a senha antiga para definir a nova senha." });
  //     }

  //     if (password && old_password) {
  //       const checkOldPassword = await compare(old_password, user.password);

  //       if (!checkOldPassword) {
  //         return response.status(400).json({ message: "A senha antiga não confere." });
  //       }

  //       user.password = await hash(password, 8);
  //     }

  //     await prismaClient.usuario.update({
  //       where: { id: user_id },
  //       data: {
  //         nome: user.nome,
  //         email: user.email,
  //         password: user.password,
  //         updatedAt: new Date()  
  //       }
  //     });

  //     return response.status(200).json();
  //   } catch (error) {
  //     console.error(error); 
  //     return response.status(500).json({ message: "Erro interno do servidor." });
  //   }
  // }

  async update(request, response) {
    const { nome, email, password, old_password } = request.body;
    const user_id = request.user.id;

    try {
      // Verifica se o usuário existe
      const user = await prismaClient.usuario.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }

      // Verifica se o e-mail já está em uso por outro usuário
      if (email) {
        const userWithUpdatedEmail = await prismaClient.usuario.findUnique({
          where: { email },
        });

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
          return response.status(400).json({ message: "Este e-mail já está em uso." });
        }
      }

      // Atualiza os campos do usuário
      const updatedUserData = {
        nome: nome ?? user.nome,
        email: email ?? user.email,
      };

      // Verifica e atualiza a senha, se necessário
      if (password && !old_password) {
        return response.status(400).json({ message: "Você deve informar a senha antiga para definir a nova senha" });
      }

      if (password && old_password) {
        const checkOldPassword = await compare(old_password, user.password);

        if (!checkOldPassword) {
          return response.status(400).json({ message: "A senha antiga não confere." });
        }

        updatedUserData.password = await hash(password, 8);
      }

      // Atualiza o usuário no banco de dados
      const updatedUser = await prismaClient.usuario.update({
        where: { id: user_id },
        data: {
          ...updatedUserData,
          updatedAt: new Date(),
        },
      });

      return response.status(200).json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Erro interno do servidor." });
    }
  }

}

module.exports = UsuariosController;