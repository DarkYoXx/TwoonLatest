const discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
    let db = new sqlite3.Database("./commands/votes.db")
    db.run("CREATE TABLE IF NOT EXISTS voteusers(addedbyuser TEXT, addedbyid TEXT, addeduser TEXT)")

module.exports.run = async(bot, message, args) => {
    if(message.author.id !== "546316934187057163") return;
    let g = bot.guilds.get("824369098111713322")
    let c = g.channels.get("835692618179543100")

    let voteduser = args[0]
   
    db.each("SELECT COUNT(*) AS count FROM voteusers WHERE addeduser = ?", voteduser, (err, votess)=>{
        if(votess.count <= 0) {
    db.run("INSERT INTO voteusers(addedbyuser, addedbyid, addeduser) VALUES(?,?,?)", message.author.username, message.author.id, voteduser, (error) => {
        message.channel.send(`**${voteduser}** has been succesfully added to the pending vote list. :thumbsup:`)
        let embed = new discord.RichEmbed()
        .setTitle("ClanX | Vote Added")
        .setDescription(`Voted user : **${voteduser}**\n\nVote added by : **${message.author.username}**\n\n\nIn order to vote, please DM the following command.\n\n Syntax :- >vote **${voteduser}** yes/no`)
        .setColor('#00d5ff')
        c.sendEmbed(embed)
    })
} else {
    message.channel.send(`**${voteduser}** already exists in the pending vote list.`)
}
    })
}
module.exports.help = {
    name: "addvote"
}