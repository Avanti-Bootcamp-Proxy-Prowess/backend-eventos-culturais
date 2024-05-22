const prismaClient = require("../database/PrismaClient.js");
const DiskStorage = require("../providers/DiskStorage");

// const prisma = new PrismaClient();

class UsuarioAvatarController {
    async update(request, response) {
        // const usuario_id = request.usuario.id;
        // const avatarFileName = request.file.filename;
        const usuario_id = request.user.id;
        const avatarFileName = request.file.filename;

        const diskStorage = new DiskStorage();

        try {
            // Verifica se o usuário está autenticado
            if (!usuario_id) {
                return response.status(401).json({ message: "Somente usuários autenticados podem mudar o avatar" });
            }

            // Busca o usuário no banco de dados
            const usuario = await prismaClient.usuario.findUnique({
                where: { id: usuario_id },
            });

            if (!usuario) {
                return response.status(404).json({ message: "Usuário não encontrado" });
            }

            // Exclui o avatar antigo se existir
            if (usuario.avatar) {
                await diskStorage .deleteFile(usuario.avatar);
            }

            // Salva o novo avatar
            const filename = await diskStorage.saveFile(avatarFileName);
            usuario.avatar = filename;

            // Atualiza o usuário no banco de dados
            const updatedUsuario = await prismaClient.usuario.update({
                where: { id: usuario_id },
                data: { avatar: filename },
            });

            return response.json(updatedUsuario);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

module.exports = UsuarioAvatarController;
