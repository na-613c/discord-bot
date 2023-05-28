const Discord = module.require('discord.js');
const requestToCrossoutDB = require('../../requests/requestToCrossoutDB');
let {colors: {error, success}} = require('../../const/colors');


class Preloader {
    constructor(msg) {
        this.msg = msg;
    }

    send() {
        const preloader = new Discord.MessageEmbed()
            .setTitle('Загрузка...')
            .setThumbnail('https://otkritkis.com/wp-content/uploads/2022/07/mvqj7.gif')

        this.preloaderMsg = this.msg.channel.send(preloader);
    }

    delete() {
        this.preloaderMsg.then(_ => _.delete())
    }
}

module.exports = Preloader