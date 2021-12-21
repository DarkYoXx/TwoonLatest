const Discord = require("discord.js")
module.exports.run = async(bot, message, args) => {
    let puncheduser = message.mentions.members.first()
    if(!puncheduser) return message.channel.send("Mention a member.")
    let randomtexts = [`**${message.author.username}** punched **${puncheduser.user.username}** in the face!`,`**${message.author.username}** tried to punch **${puncheduser.user.username}** but they blocked it!`,`**${message.author.username}** punched **${puncheduser.user.username}** knocking them out!`,`**${message.author.username}** punched **${puncheduser.user.username}** but they fought back!`,`**${message.author.username}** wanted to punch **${puncheduser.user.username}** but was too scared to do it.`]
let picked = Math.floor(Math.random() * randomtexts.length)
message.channel.send(randomtexts[picked])
}
module.exports.help = {
    name: "punch"
}