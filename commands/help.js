

//COPYRIGHTS RESERVED FOR HAWK ( TWOON BOT )
  


const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => { 
    let reaction = bot.emojis.get("740988081330454670")
    let reactions = bot.emojis.get("740988139019173919")
message.member.send(`Hey **${message.author.username}**! Thank you for using **Twoon**.\nYou can find more information about **Twoon** in\n**Twoon**'s website: http://twoon-bot.com/\n**Twoon**'s support server: discord.gg/GcHUsEK\nHope you enjoy the bot! ${reactions}`)

message.react(reaction)
}
module.exports.help = {
name: "help"
}
