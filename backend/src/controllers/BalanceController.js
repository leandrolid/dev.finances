const Inflow = require('../models/Inflow');
const Outflow = require('../models/Outflow');

module.exports = {
    async show(request, response){
        let { user_id } = request.headers
        const income = await Inflow.find({ user: user_id})
        const outcome = await Outflow.find({ user: user_id})

        let total_inflow = income.reduce(getTotal, 0);
        function getTotal(total, item) {
            return total + (item.price);
        }

        let total_outflow = outcome.reduce(getTotal, 0);
        function getTotal(total, item) {
            return total + (item.price);
        }

        let total_balance = total_inflow - total_outflow

        return response.json({
            total_inflow,
            total_outflow,
            total_balance,
            income,
            outcome
        }) 
    },

    
    
};

