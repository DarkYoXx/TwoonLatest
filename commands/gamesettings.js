const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/rpcgame.db');
let dbs = new sqlite3.Database('./credits.db');
db.run("CREATE TABLE IF NOT EXISTS rpcset(userid TEXT,guildid TEXT,money INTEGER)")
module.exports.run = async (bot, message, args) => {
    
    let money = Math.round(args[0])
    if(isNaN(money)) return message.channel.send("Invalid Number.")
    if(money <= 0) return message.channel.send("Your bet can't be less than or equal zero.")
    if(money > 500) return message.channel.send(`Sorry **${message.author.username}**, your bet can't be higher than **500$** credits.`)
  dbs.each("SELECT * FROM credits WHERE userid = ?", message.author.id, (error, row) => {

    
        
if(row.credits >= money){
    
    
    db.run("DELETE from rpcset WHERE userid = ?", message.author.id)
   db.run("INSERT INTO rpcset(userid,guildid,money) VALUES(?,?,?)",message.author.id,message.guild.id,money)
    message.channel.send(`You successfully set **${money}$** as your bet.`)
} else {
    if(row.credits <= money) {

    
   message.channel.send("No enough money")
   }
}
})

}
module.exports.help = {
    name: "bet"
}
