const discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
    let db = new sqlite3.Database("./commands/votes.db")
    db.run("CREATE TABLE IF NOT EXISTS voteusers(addedbyuser TEXT, addedbyid TEXT, addeduser TEXT)")

module.exports.run = async(bot, message, args) => {
    if(message.author.id !== "546316934187057163") return;

    db.each("SELECT COUNT(*) AS count FROM voteusers WHERE addeduser = ?", args[0], (err, votess)=>{
        if(votess.count > 0) {
    db.run("DELETE FROM voteusers WHERE addeduser = ?", args[0])
    message.channel.send(`**${args[0]}** has been successfully removed from the voting list.`)
        } else {
            message.channel.send(`**${args[0]}** doesn't exist.`)
        }
    })
}
module.exports.help = {
    name: "removeuser"
}