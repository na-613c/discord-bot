const Discord = require("discord.js");
let usersLvl = require('../common/usersLvl')



exports.run = async (bot, msg, args) => {
    
    if (msg.author.id == 495627024816406548) {
        const user = msg.mentions.users.first();
        usersLvl.addCoins(user.id, Number(args[1]))
        let embed = new Discord.MessageEmbed().setColor('42aaff').setTitle('Читы')
        msg.channel.send(embed);

    } else {
        let embed = new Discord.MessageEmbed().setColor('42aaff').setTitle('У Вас нет прав для данной операции.');
        msg.channel.send(embed);
        msg.author.send('Накожу :З')
    }
};

exports.help = {
    name: 'c',
    description: `Добавить монет [для админа]`,
    usage: 'add coins'
};