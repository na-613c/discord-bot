const Discord = require('discord.js');
const fs = require('fs');
let config = require('./botconfig.json');
let {colors: {error, success}} = require('../const/colors');

async function discordBot() {


    const bot = new Discord.Client();
    bot.comands = new Discord.Collection();
    bot.hidecomands = new Discord.Collection();
    let token = config.token;
    let prefix = config.prefix;
    const uri = './src/discord/cmd/'

    fs.readdir(uri, (err, files) => {
        if (err) console.log(err);

        let jsFile = files.filter(f => f.split('.').pop() === 'js');

        if (jsFile.length <= 0) console.log("No comands")

        console.log(`загружено ${jsFile.length} команд`)
        console.log(jsFile)

        jsFile.forEach((f, i) => {
            let props = require(`./cmd/${f}`);
            console.log(`${i + 1}.${f} загружено`);
            bot.comands.set(props.help.name, props);
        })

    })

    bot.on('ready', () => {
        console.log('I am ready!');
        bot.generateInvite(['ADMINISTRATOR']).then(link => console.log(link))
        // rules(bot)
    });


    bot.on('message', async msg => {
        if (msg.author.bot) return;
        if (msg.channel.type === 'dm') return;

        let user = msg.author.username;
        let userId = msg.author.id;

        let messageArray = msg.content.split(' ');
        let comand = messageArray[0].toLocaleLowerCase();
        let args = messageArray.slice(1);

        if (comand === '!хелп') {
            let embed = new Discord.MessageEmbed()
                .setTitle('ИНФОРМАЦИЯ О КОМАНДАХ ДЛЯ БОТА :')
                .setColor(success)
            bot.comands.forEach((e) => {
                embed.addField(e.help.name, `${prefix}${e.help.usage} - ${e.help.description}`)
            })
            msg.channel.send(embed);
        }

        if (!msg.content.startsWith(prefix)) return;
        let arrayComands = bot.comands.concat(bot.hidecomands)
        let cmd = arrayComands.get(comand.slice(prefix.length))

        if (cmd) cmd.run(bot, msg, args);
    });


    await bot.login(token);
}

module.exports = discordBot;