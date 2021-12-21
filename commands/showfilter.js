const discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database("./commands/filter.db")
module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
db.all("SELECT * FROM filter WHERE guildid = ?", message.guild.id, (error, filter) => {
    message.channel.send(" ``` WORD ID  -  USER ID  -  WORD ```")
    filter.forEach((row) => {
        message.channel.send(`#**${row.id}**  -  **${row.userid}**  -  **${row.word}**`)
    })

})
}
module.exports.help = {
    name: "filter"
}