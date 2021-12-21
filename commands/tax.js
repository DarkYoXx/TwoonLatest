const discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()

module.exports.run = async(bot, message, args) => {
 let credits = Number(args[0])
 let calculated = Math.ceil(credits*0.052631579)
 if(isNaN(credits)) return message.channel.send("Only numbers are allowed.")
 let result = credits+calculated;
 let em = new discord.RichEmbed()
 .setColor('#00d5ff')
 .setTitle("ProBot Tax Calculator")
 .setDescription(`\n\n**Total** :- ${result}$\n**Tax** :- ${calculated}$`)
message.channel.send(em)
}
module.exports.help = {
    name: "tax"
}