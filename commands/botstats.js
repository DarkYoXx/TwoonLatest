const Discord = require("discord.js")
module.exports.run = async(bot, message, args) => {
message.channel.send(`${bot.guilds.size} servers ${bot.users.size} members!`);
}
module.exports.help = {
name: "botstatsdark"
}