const discordBot = require('./src/discord/index')
require('events').EventEmitter.prototype._maxListeners = 100;
const main = async  () => {
    await discordBot()
}

main()



