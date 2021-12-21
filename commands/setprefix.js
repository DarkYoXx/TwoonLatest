const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/prefix.db');
db.run("CREATE TABLE IF NOT EXISTS settings (guildid UNIQUE, prefix TEXT)")
module.exports.run = async (bot, message, args) => {
    let prefix = args[0]
    if(!prefix) return message.channel.send("Please type the new prefix.")
    if(message.member.hasPermission('ADMINISTRATOR')) {
    db.run("DELETE FROM settings WHERE guildid = ?", message.guild.id)
    db.run("INSERT INTO settings(guildid, prefix) VALUES(?,?)", message.guild.id, prefix)
    message.channel.send("Bot prefix changed to`"+prefix+"`")
    } else {
        return;
    }

}
module.exports.help = {
    name : "setprefix"
}