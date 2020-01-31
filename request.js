const axios = require('axios')

const CheckLimit = (prices) => {
    if (prices.length == 601)
        prices.splice(1, 1)
}

module.exports = (price) => {
    return new Promise((resolve, reject) => {
        axios.post('https://www.viagogo.com/Concert-Tickets/Rap-Hip-Hop-Reggae/AAP-Ferg-Tickets/E-4286701', {})
        .then((res) => {
            CheckLimit(price)
            let currentPrice = []
            
            currentPrice.push(res.data.Items[0]['RawPrice'])
            currentPrice.push(res.data.Items[1]['RawPrice'])

            price.push(currentPrice)  
            
            resolve(currentPrice) 
        })
    });
}

