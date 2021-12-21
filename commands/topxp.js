const Discord = require("discord.js");
const Canvas = require('canvas');

const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./ranking.db');
module.exports.run = async (bot, message, args) => {
    db.all('SELECT * FROM ranking ORDER BY xp DESC LIMIT 10', (error, rows) => {
        var myCounter = 1;
        var allmsg = '';
        rows.forEach(function (row) {

            allmsg += `${myCounter++}- **${row.tag}** - ${row.level}\n`
        }) 
        message.channel.send({
            embed: {
                title: "XP Leaderboard",
                color: 000000,
                description: `${allmsg}`
            }
        })
    
    })
}
 
module.exports.help = {
    name: "topxp"

}

