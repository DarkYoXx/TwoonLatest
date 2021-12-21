const Discord = require("discord.js")
module.exports.run = async(bot, message, args) => {
    let puncheduser = message.mentions.members.first()
    if(!puncheduser) return message.channel.send("Mention a member.")
    let randomtexts = [`**${message.author.username}** kissed **${puncheduser.user.username}** on the lips! :kiss:`,`**${message.author.username}** french-kissed **${puncheduser.user.username}**! :wink:`,`**${message.author.username}** was too shy to kiss **${puncheduser.user.username}**! :flushed:`,`**${message.author.username}** awkwardly kissed  **${puncheduser.user.username}** on the cheek!`,`**${message.author.username}** wanted to kiss **${puncheduser.user.username}** but they rejected.`]
let picked = Math.floor(Math.random() * randomtexts.length)
message.channel.send(randomtexts[picked])
}
module.exports.help = {
    name: "kiss"
}