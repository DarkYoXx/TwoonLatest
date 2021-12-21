const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database("./commands/logschannel.db")
db.run("CREATE TABLE IF NOT EXISTS logschannel(guildid UNIQUE, channelid TEXT)")
module.exports.run = async(bot, message, args) => {
    if(message.author.bot) return;
    let channelid = args[0]
    if(!channelid) return message.channel.send("Please type channel id.")
    if(isNaN(channelid)) return message.channel.send("This is not a channel id.")
    if(message.member.hasPermission("ADMINISTRATOR")) {
        db.each("SELECT COUNT(*) AS count FROM logschannel WHERE channelid = ?", channelid, (err, c) => {
if(c.count <= 0) {
       
       let channelgot = message.guild.channels.cache.find(c => c.id == `${channelid}`)
       if(!channelgot) return message.channel.send("Invalid ID.")
       db.run("DELETE FROM logschannel WHERE guildid = ?", message.guild.id)
        db.run("INSERT INTO logschannel(guildid, channelid) VALUES(?,?)", message.guild.id, channelid)
        message.channel.send(`Channel ID ${channelid} [${channelgot.name}] is now set to be  **Twoon's Logging channel**.`).catch(err => console.log(err));
} else {
    message.channel.send(`This channel is already set as logs channel.`)
}
    })
    }
}
module.exports.help = {
    name: "setlogschannel"
}