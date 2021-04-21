const connection = require('../database/connection');

module.exports = {
    async index(request, response ){
        const ong_id = request.headers.authorization;

        const incidentes = await connection('doacao')
            .where('ong_id', ong_id)
            .select('*');

        return response.status(200).json(incidentes);

    }

}