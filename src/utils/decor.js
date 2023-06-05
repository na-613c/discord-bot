const axios = require('axios');

async function getDecorResponse(resources) {

    const {metal100, copper100, wires100, batteries100, plastic100, electron100} = await resources

    return [
        {
            sell: 0.9 * (40 * metal100.sell + 100 * copper100.sell + 60 * wires100.sell + 30 * plastic100.sell),
            buy: 0.9 * (40 * metal100.buy + 100 * copper100.buy + 60 * wires100.buy + 30 * plastic100.buy),
        },
        {
            sell: 0.9 * (80 * metal100.sell + 150 * copper100.sell + 170 * wires100.sell + 80 * plastic100.sell),
            buy: 0.9 * (80 * metal100.buy + 150 * copper100.buy + 170 * wires100.buy + 80 * plastic100.buy),
        },
        {
            sell: 0.9 * (50 * metal100.sell + 250 * copper100.sell + 250 * batteries100.sell + 250 * electron100.sell),
            buy: 0.9 * (50 * metal100.buy + 250 * copper100.buy + 250 * batteries100.buy + 250 * electron100.buy),
        },
    ]


}

module.exports = getDecorResponse;