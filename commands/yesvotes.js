const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
let clanx2 = new sqlite3.Database("./commands/votings.db")
module.exports.run = async(bot, message, args) => {
    if(message.author.id !== "546316934187057163") return;
    clanx2.all('SELECT * FROM votes WHERE voteduser = ?', args[0], (error, rows) => {
        var allmsg = '';
        rows.forEach(function (row) {
            allmsg += `- **${row.votinguser}** voted **${row.vote}**.\n`
        })
        clanx2.each("SELECT COUNT(*) AS count FROM votes WHERE voteduser = ? AND vote = ?", args[0], "yes", (err, yes) => {
            clanx2.each("SELECT COUNT(*) AS count FROM votes WHERE voteduser = ? AND vote = ?", args[0], "no", (err, no) => {
        message.channel.send({
            embed: {
                title: `Votes logger for ${args[0]}`,
                color: 3447003,
                description: `${allmsg} \n\n**Vote Stats** :-\n\n Yes : **${yes.count}**\n No : **${no.count}**`
            }
        })
        })
    })
    })
}
module.exports.help = {
    name: "votes"
}