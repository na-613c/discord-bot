const axios = require('axios');

async function getResources() {
    const resourcesID = [53, 43, 785, 784, 85, 168, 106]

    const promises = resourcesID.map(async (id) => axios.get(`https://crossoutdb.com/api/v1/item/${id}`))

    const res = await Promise.all(promises)

    const currentValue = (d) => ({
        imagePath: `https://crossoutdb.com${d.imagePath}`,
        sell: +d.formatSellPrice / d.amount,
        buy: +d.formatBuyPrice / d.amount
    })

    return res.reduce(async (prev, response) => {
        const data = await response.data[0]
        if (data.id === 53) {
            return {
                ...(await prev),
                metal100: currentValue(data)
            }
        } else if (data.id === 43) {
            return {
                ...(await prev),
                copper100: currentValue(data)
            }
        } else if (data.id === 785) {
            return {
                ...(await prev),
                plastic100: currentValue(data)
            }
        } else if (data.id === 784) {
            return {
                ...(await prev),
                batteries100: currentValue(data)
            }
        } else if (data.id === 85) {
            return {
                ...(await prev),
                wires100: currentValue(data)
            }
        } else if (data.id === 168) {
            return {
                ...(await prev),
                electron100: currentValue(data)
            }
        } else if (data.id === 106) {
            return {
                ...(await prev),
                oil100: currentValue(data)
            }
        }

        return (await prev);
    }, {})

}

module.exports = getResources;