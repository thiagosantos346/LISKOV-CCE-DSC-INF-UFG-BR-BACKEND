const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');


module.exports = {
    async create(request, response){
        const ID_LENGTH = 4;
        const { name, email, whatsapp, city, uf } = request.body;
        const id = generateUniqueId(ID_LENGTH);
    
        await connection('banco_sanguineo').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
        
        return response.json({id, name, email, whatsapp, city, uf});
    },

    async index(request, response){
        const bancosanguineo = await connection('banco_sanguineo').select('*');
        
        return  response.json(bancosanguineo);
    }
}