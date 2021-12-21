const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/rpcgame.db');
module.exports.run = async(bot, message, args) => {
    db.each("SELECT COUNT(*) AS count FROM rpcset WHERE userid = ?", message.author.id, (err, bugfix) => {
if(bugfix.count > 0) {
    
    db.each("SELECT * FROM rpcset WHERE userid = ?", message.author.id, (err, money) => {
        message.channel.send(`Your game bet is **${money.money}$**.`)

    })
} else {
    message.channel.send("You haven't set a bet yet, use **>bet [amount]** to set your own bet!")
}

    })
}
module.exports.help = {
    name: "mybet"
}