const requestToCrossoutDB = require('./src/requestToCrossoutDB');

const topCraftUrl = ['https://crossoutdb.com/#preset=crafting.rarity=special,epic.craftable=true.order=20desc.'];

const searchCraftUrl = (str) => [`https://crossoutdb.com/#preset=crafting.search=${str}`, `https://crossoutdb.com/#search=${str}`];


(async () => {
    const res = await requestToCrossoutDB(topCraftUrl)
    // const res = await requestToCrossoutDB(searchCraftUrl("ёкай"))

    console.log(res)
})()



