const Inflow = require('../models/Inflow');
 
module.exports = {
    async index(request, response) {
        let { user_id } = request.headers
        const income = await Inflow.find({ user: user_id})

        return response.json(income)
    },

    async store(request, response) {

        const { description, price } = request.body;
        const { user_id } = request.headers;

        let data = await new Date();

        let dia     = data.getDate();     // 1-31
        let mes     = data.getMonth()+1;    // 0-11 (zero=janeiro)
        let ano4    = data.getFullYear(); // 4 dígitos
        let date = dia + '/' + mes + '/' + ano4;

        const type = true;

        const inflow = await Inflow.create({
            user: user_id,
            description,
            price,
            date,
            type
        })
    

        return response.json(inflow);
    }
};