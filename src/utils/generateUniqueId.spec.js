const generateUnique = require('../utils/generateUniqueId');

describe('Generate Unique ID', ()=>{
    it('should generate an unique ID', ()=>{
        const id = generateUnique(4);
        expect(id).toHaveLength(8);
    })
})