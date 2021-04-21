const request = require('supertest');
const app = require('../../src/App');
const connection = require('../../src/database/connection');

describe('BANCO_SANGUINEO', ()=>{
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async()=>{
        await connection.destroy();
    })

    it('should be able to creat a new BANCO_SANGUINEO', async ()=>{
        const response = await request(app)
        .post('/bancosanguineo')
        .send({
            name : "Dco",
            email :"dco@gmail.com",
            whatsapp:"63996866578",
            city:"Pedras",
            uf:"RR"
        });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
}); 