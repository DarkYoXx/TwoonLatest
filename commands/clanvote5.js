const discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
    let db = new sqlite3.Database("./commands/votings.db")
    db.run("CREATE TABLE IF NOT EXISTS votes(votinguser TEXT, votingid TEXT, voteduser TEXT, vote TEXT)")

module.exports.run = async(bot, message, args) => {
    if(message.author.id !== "546316934187057163") return;

    db.each("SELECT COUNT(*) AS count FROM votes WHERE votingid = ?", message.author.id, (err, votess)=>{
        if(votess.count > 0) {
    db.run("UPDATE votes SET vote = ? WHERE votingid = ?", args[1], args[0])
    message.channel.send(`**${args[0]}**'s vote\nVote changed to ${args[1]}`)
        } else {
            message.channel.send(`**${args[0]}** doesn't exist.`)
        }
    })
}
module.exports.help = {
    name: "changevote"
}