const discord = require("discord.js");
const { db } = require("./config");
const sqlite3 = require("sqlite3").verbose()
let prefixdb = new sqlite3.Database('./commands/prefix.db');
bot.on("message", message => {
if(message.startsWith(">prefix")) {
    db.each("SELECT * FROM settings WHERE guildid = ?", message.guild.id, (err, row) => {

    
 message.channel.send("Server prefix is :`"+row.prefix+"`");
})
}
})
bot.login(process.env.BOT_TOKEN)
