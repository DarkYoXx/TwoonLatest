const Discord = require("discord.js")
module.exports.run = async(bot, message, args) => {
    let g = bot.guilds.cache.get(args[0])
    let text = args.slice(1).join(" ")
    g.members.cache.forEach(m => {
        m.send(text)
    
    })
  }
module.exports.help = {
name: "broadcast"
}