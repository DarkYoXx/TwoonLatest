const Discord = require("discord.js");
const Canvas = require('canvas');

const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./credits.db');
module.exports.run = async (bot, message, args) => {
    db.all('SELECT * FROM credits ORDER BY credits DESC LIMIT 10', (error, rows) => {
        var myCounter = 1;
        var allmsg = '';
        rows.forEach(function (row) {
            if(row.credits == "") return;

            allmsg += `${myCounter++}- <@${row.userid}> - ${row.credits}$\n`
        }) 
        message.channel.send({
            embed: {
                title: "Top Credits",
                color: 000000,
                description: `${allmsg}`
            }
        })
    
    })
}
 
module.exports.help = {
    name: "topcredits"

}

