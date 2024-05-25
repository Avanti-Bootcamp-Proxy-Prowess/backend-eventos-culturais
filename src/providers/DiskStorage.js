// funcoes para salvar e deletar arquivo
const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
    async saveFile(file){
        //funcao rename do fs aqui é pra mudar o arquivo de lugar (rename pode muda ou renomear um arquivo)
        //path.resolve() : resolve uma sequencia de segmentos de caminho para uma caminho absoluto
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file), 
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        );

        return file;
    }

    //deleta um arquivo na pasta UPLOADS_FOLDER
    // stat : retorna o status do arquivo
    // unlink : remove o arquivo
    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;