const discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database("./commands/votes.db")
db.run("CREATE TABLE IF NOT EXISTS voteusers(addedbyuser TEXT, addedbyid TEXT, addeduser TEXT)")

module.exports.run = async(bot, message, args) => {
    db.all('SELECT * FROM voteusers', (error, rows) => {
        var allmsg = '';
        rows.forEach(function (row) {
            allmsg += `- **${row.addeduser}**`
        })
        message.channel.send({
            embed: {
                title: "Pending Vote List",
                color: 3447003,
                description: `${allmsg}`
            }
        })
    })
}
module.exports.help = {
    name: "votelist"
}