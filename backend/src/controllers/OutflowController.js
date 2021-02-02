const Outflow = require('../models/Outflow');
 
module.exports = {
    async index(request, response) {
        let { user_id } = request.headers
        const outcome = await Outflow.find({ user: user_id})
        
        return response.json(outcome)
    },

    async store(request, response) {

        const { description, price } = request.body;
        let { user_id } = request.headers;

        let data = await new Date();

        let dia     = data.getDate();     // 1-31
        let mes     = data.getMonth();    // 0-11 (zero=janeiro)
        let ano4    = data.getFullYear(); // 4 dígitos
        let date = dia + '/' + (mes+1) + '/' + ano4

        const type = false;

        const outflow = await Outflow.create({
            user: user_id,
            description,
            price,
            date,
            type
        })
    

        return response.json(outflow);
    }
};