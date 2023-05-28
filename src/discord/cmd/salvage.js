const Discord = module.require('discord.js');
const getResources = require('../../requests/requestToAPI');
const getDecorResponse = require('../../utils/decor');
const Preloader = require("../common/preloader");
let {colors: {error, success}} = require('../../const/colors');

module.exports.run = async (bot, msg, args) => {
    const preloader = new Preloader(msg)
    preloader.send()
    const resources = await getResources()
    const decors = await getDecorResponse(resources)

    let embed = new Discord.MessageEmbed()

    if (decors.length === 0) {
        embed
            .setColor(error)
            .setTitle('Результат не найден')
    } else {
        embed
            .setColor(success)
            .setTitle('Разбор декора')

        decors.forEach((decor, id) => {
            let title = '';
            if (id === 0) {
                title = 'Особый'
            } else if (id === 1) {
                title = 'Эпический'
            } else if (id === 2) {
                title = 'Легендарный'
            }
            embed.addField(title, `продажа : **${decor.sell.toFixed(2)}** | покупка : **${decor.buy.toFixed(2)}**`)
        })

    }

        preloader.delete()

    msg.channel.send(embed);
}

module.exports.help = {
    name: 'разбор',
    description: 'Показывает результат разбора декора c учётом комиссии рынка.',
    usage: 'разбор'
}