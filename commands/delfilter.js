const discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database("./commands/filter.db")
module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return;
    let check = bot.emojis.cache.get("740988081330454670")
    let id = args[0]
    db.each("SELECT * FROM filter WHERE id = ?",id, 
  (error, row) => {
      if(error) return console.log(error)
  /*gets called for every row our query returns*/
  
db.run("DELETE FROM filter WHERE id = ?", id)
message.channel.send(`Word ID **${id}** was successfully deleted ${check}`)
  })
}
module.exports.help = {
    name: "delword"
}