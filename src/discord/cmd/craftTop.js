const Discord = module.require('discord.js');
const requestToCrossoutDB = require('../../requests/requestToCrossoutDB');
const Preloader = require('../common/preloader');
let {colors: {error, success}} = require('../../const/colors');

const topCraftUrl = ['https://crossoutdb.com/#preset=crafting.rarity=special,epic.craftable=true.order=20desc.'];

module.exports.run = async (bot, msg, args) => {
    const preloader = new Preloader(msg)
    preloader.send()
    const res = await requestToCrossoutDB(topCraftUrl)
    let embed = new Discord.MessageEmbed()
    if (res.length === 0 || res.title === "") {
        embed
            .setColor(error)
            .setTitle('Результат не найден')
    } else {
        embed
            .setColor(success)
            .setTitle('Топ10 деталей для крафта')

        res.forEach(({img, title, sell, craftSell, buy, craftBuy, craftMargin}) => {
            embed.addField(title, `цена ресурсов: **${craftBuy}** | выгода : **${craftMargin}**`)
        })
    }

    preloader.delete()
    msg.channel.send(embed);
}

module.exports.help = {
    name: 'крафт',
    description: 'Показывает 10 самых выгодных для производства деталей (эпик и особые).',
    usage: 'крафт'
}