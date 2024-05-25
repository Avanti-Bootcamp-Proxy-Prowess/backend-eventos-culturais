const prismaClient = require("../database/PrismaClient.js");

class EventosController {
    async listarEventos(request, response) {
        try {
            const { nome } = request.query;
            const eventos = await prismaClient.evento.findMany({
                where: {
                    nome: {
                        contains: nome,
                        mode: 'insensitive', 
                    }
                },
                include: {
                    categoria: true,
                    local: true,
                },
            });
            return response.json(eventos);
        } catch (error) {
            return response.status(500).send();
        }
    }

    async criarEvento(request, response) {
        const { nome, data_evento, descricao, categoria_id, local_id, usuario_id } = request.body;

        if (!nome || !data_evento || !descricao || !categoria_id || !local_id || !usuario_id) {
            return response.status(400).send('Um ou mais campos não foram preenchidos');
        }

        const dataEventoISO = new Date(data_evento).toISOString();

        try {
            const evento = await prismaClient.evento.create({
                data: {
                    nome: nome,
                    data_evento: dataEventoISO,
                    descricao: descricao,
                    categoria_id: categoria_id,
                    local_id: local_id,
                    usuario_id: usuario_id
                }
            });
            return response.status(201).json(evento);
        } catch (error) {
            return response.status(500).send();
        }
    }

    async atualizarEvento(request, response) {
        const { id } = request.params;
        const { nome, data_evento, descricao, categoria_id, local_id } = request.body;
        try {
            const evento = await prismaClient.evento.update({
                where: {
                    id
                },
                data: {
                    nome: nome,
                    data_evento: data_evento,
                    descricao: descricao,
                    categoria_id: categoria_id,
                    local_id: local_id
                },
                include: {
                    categoria: true, 
                    local: true 
                }
            });
            return response.status(200).json(evento);
        } catch (error) {
            return response.status(500).send();
        }
    }

    async deletarEvento(request, response) {
        const { id } = request.params;
        try {
            const evento = await prismaClient.evento.delete({
                where: {
                    id
                }
            });
            return response.status(204).send();
        } catch (error) {
            if (error.code === 'P2025') {
                return response.status(404).send('Registro não encontrado');
            } else {
                return response.status(500).send();
            }
        }
    }


    async filtrarEventos(request, response) {
        const { nome, categoria, local, data } = request.query;
        console.log("Filtros recebidos:", { nome, categoria, local, data }); // Log dos filtros recebidos

        try {
            const filtros = {};

            if (nome) {
                filtros.nome = { contains: nome, mode: 'insensitive' };
            }
            if (categoria) {
                filtros.categoria_id = categoria.toString(); 
            }
            if (local) {
                filtros.local_id = local.toString(); 
            }
            if (data) {
                filtros.data_evento = new Date(data);
            }

            console.log("Filtros aplicados:", filtros); // log dos filtros 

            const eventosFiltrados = await prismaClient.evento.findMany({
                where: {
                    AND: [
                        filtros.nome ? { nome: filtros.nome } : {},
                        filtros.categoria_id ? { categoria_id: filtros.categoria_id } : {},
                        filtros.local_id ? { local_id: filtros.local_id } : {},
                        filtros.data_evento ? { data_evento: filtros.data_evento } : {}
                    ]
                },
                include: {
                    categoria: true,
                    local: true,
                },
            });

            return response.status(200).json(eventosFiltrados);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error); // Log do erro
            return response.status(500).send();
        }
    }
 
}

module.exports = EventosController;