const Discord = module.require('discord.js');
const getResources = require('../../requests/requestToAPI');
let {colors: {error, success}} = require('../../const/colors');
const Preloader = require("../common/preloader");

module.exports.run = async (bot, msg, args) => {
    const preloader = new Preloader(msg)
    preloader.send()
    const resources = await getResources()

    let embed = new Discord.MessageEmbed()

    embed
        .setColor(success)
        .setTitle('Фарм')

    const games = [
        {
            name: "Металлолом",
            victory: 25,
            lose: 18,
            key: 'metal100'
        }, {
            name: "Провода",
            victory: 13,
            lose: 7,
            key: 'wires100'

        }, {
            name: "Аккумуляторы",
            victory: 5,
            lose: 3,
            key: 'batteries100'

        }, {
            name: "Клановые бои",
            victory: 50,
            lose: 30,
            key: 'metal100'
        }
        , {
            name: "Вторжение",
            victory: 144,
            lose: 69,
            key: 'metal100'
        }
    ]

    games.forEach((game, id) => {
        const victorySell = (resources[game.key].sell * game.victory).toFixed(2)
        const victoryBuy = (resources[game.key].buy * game.victory).toFixed(2)
        const loseSell = (resources[game.key].sell * game.lose).toFixed(2)
        const loseBuy = (resources[game.key].buy * game.lose).toFixed(2)

        embed.addField(game.name, `продажа : **${victorySell} (${loseSell})** | покупка : **${victoryBuy} (${loseBuy})**`)
    })

    embed.addField('Бензин', `продажа : **${(resources.oil100.sell * 15).toFixed(2)}** | покупка : **${(resources.oil100.buy * 15).toFixed(2)}**`)

        preloader.delete()

    msg.channel.send(embed);
}

module.exports.help = {
    name: 'фарм',
    description: 'Показывает выгоду за бои в монетах (без комиссии рынка).',
    usage: 'фарм'
}