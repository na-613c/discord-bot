const Discord = module.require('discord.js');
const requestToCrossoutDB = require('../../requests/requestToCrossoutDB');
const {colors: {error, success}} = require('../../const/colors');
const Preloader = require("../common/preloader");

const searchCraftUrl = (str) => [`https://crossoutdb.com/#preset=crafting.search=${str}`, `https://crossoutdb.com/#search=${str}`];


module.exports.run = async (bot, msg, args) => {
    const preloader = new Preloader(msg)
    preloader.send()

    const res = await requestToCrossoutDB(searchCraftUrl(args[0]))


    let embed = new Discord.MessageEmbed()
    if (res.length === 0 || res.title === "") {
        embed
            .setColor(error)
            .setTitle('Результат не найден')
    } else {
        const [{img, title, sell, craftSell, buy, craftBuy, craftMargin}] = res

        embed
            .setColor(success)
            .setTitle(title)
            .addField('Цена', `продажа : **${sell}** | покупка : **${buy}**`)
            .setThumbnail(img)

        if (craftSell.toString() !== '0.00') {
            embed.addField('Стоимость крафта', `по цене продажи : **${craftSell}** | по цене покупки : **${craftBuy}**`)
        }

        const roi = (sell * 0.9 - buy).toFixed(2)
        embed.addField('Выгода перепродажи', `**${roi}**`)

        if (craftMargin.toString() !== '0.00') {
            embed.addField('Выгода крафта для продажи', `**${craftMargin}**`)
        }
    }
    preloader.delete()

    msg.channel.send(embed);
}

module.exports.help = {
    name: 'р',
    description: 'Запрос станка.',
    usage: 'р *название детали*'
}