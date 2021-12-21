const Discord = require("discord.js")
module.exports.run = async(bot, message, args) => {
    let puncheduser = message.mentions.members.first()
    if(!puncheduser) return message.channel.send("Mention a member.")
    
message.channel.send(`**${message.author.username}** spanked **${puncheduser.user.username}** on the ass. :flushed:`)
}
module.exports.help = {
    name: "spank"
}