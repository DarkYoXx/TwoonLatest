const discord = require("discord.js");
module.exports.run = async(bot, message, args) => {
    let huggedUser = message.mentions.members.first();
    let reactions = bot.emojis.get("740988139019173919")
    if(!huggedUser) return message.channel.send("Mention a member.")
    if(huggedUser.user.id == "282859044593598464") return message.channel.send(`**${message.author.username}** punched  **ProBot :sparkles:** knocking them out!`)
    message.channel.send(`**${message.author.username}** hugged **${huggedUser.user.username}** warmly! ${reactions}`)

}
module.exports.help = {
    name: "hug"
}