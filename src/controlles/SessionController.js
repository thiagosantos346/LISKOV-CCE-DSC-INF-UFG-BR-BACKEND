const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('banco_sanguineo')
            .where('id', id)
            .select('name')
            .first();

            if(!ong){
                return response.status(400).json({error : `Not found ong whit this id :${id}.` });
            }

            return response.json(ong);
    }
}