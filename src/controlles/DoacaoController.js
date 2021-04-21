const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        
        const [id] = await connection('doacao').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({id});
    },

    async index(request, response){
        const { page = 1 } = request.query;
        const doacao = await connection('doacao')
        .join('banco_sanguineo', 'banco_sanguineo.id', '=', 'doacao.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['doacao.*', 'banco_sanguineo.name', 'banco_sanguineo.email', 'banco_sanguineo.whatsapp', 'banco_sanguineo.city', 'banco_sanguineo.uf']);

        const [count] = await connection('doacao').count();
        
        response.header('X-Total-Count', count['count(*)']);
        
        return  response.json(doacao);
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const doacao = await connection('doacao')
            .where('id', id)
            .select('ong_id')
            .first();
        
        if(doacao.ong_id !== ong_id ){
            return response.status(401).json({"status":" Operation not allowed"});
        }

        await connection('doacao').where('id', id).delete();

        return response.status(204).send();

    
    }
}