const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/serversettings.db');
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first()
    
       
    db.each("SELECT * FROM settings WHERE guildid = ?", message.guild.id, (error, row) => {
        if(!user) {
    
    message.reply(`${row.invitetext} ${row.invitelink}`)

        } else {
            message.channel.send(`${user.user}, ${row.invitetext} ${row.invitelink}`)
        }
    })
}
module.exports.help = {
    name : "invite"
}