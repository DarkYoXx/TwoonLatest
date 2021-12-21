const discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
    let db1 = new sqlite3.Database("./commands/votes.db")
let db2 = new sqlite3.Database("./commands/votings.db")

module.exports.run = async(bot, message, args) => {
    if(message.author.id !== "546316934187057163") return;
    let g = bot.guilds.get("824369098111713322")
    let c = g.channels.get("835692618179543100")
    db1.each("SELECT COUNT(*) AS count FROM voteusers WHERE addeduser = ?", args[0], (err, votess)=>{
        if(votess.count > 0) {
    
    message.channel.send(`**${args[0]}**'s vote ended.`)
    db2.each("SELECT COUNT(*) AS count FROM votes WHERE voteduser = ? AND vote = ?", args[0], "yes", (err, yes) => {
        db2.each("SELECT COUNT(*) AS count FROM votes WHERE voteduser = ? AND vote = ?", args[0], "no", (err, no) => {
            
            if(yes.count > no.count) {
               let result = "Accepted."
    let embed = new discord.RichEmbed()
    .setTitle("ClanX | Vote Ended")
    .setDescription(`Voted user : **${args[0]}**\nVote ended by : **${message.author.username}**\nVote result : **${result}**`)
    .setColor("6EFF33")
    c.sendEmbed(embed)

            } else {
                let result = "Rejected."
                let embed = new discord.RichEmbed()
    .setTitle("ClanX | Vote Ended")
    .setDescription(`Voted user : **${args[0]}**\nVote ended by : **${message.author.username}**\nVote result : **${result}**`)
    .setColor("EE0808")
    c.sendEmbed(embed)

            }
            db1.run("DELETE FROM voteusers WHERE addeduser = ?", args[0])
    db2.run("DELETE FROM votes WHERE voteduser = ?", args[0])
        })
    })
        } else {
            message.channel.send(`**${args[0]}** couldn't find this user in the database.`)
        }
    })
}
module.exports.help = {
    name: "endvote"
}