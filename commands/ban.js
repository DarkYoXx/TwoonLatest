const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database("./commands/infractions.db")
let prefixdb = new sqlite3.Database("./commands/prefix.db")
let channeldb = new sqlite3.Database("./commands/logschannel.db")
module.exports.run = async (bot, message, args) => {
    let warnsID = Math.floor(Math.random() * 5000)
    
    let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  
    
    let reason = args.slice(1).join(" ");
    prefixdb.each("SELECT * FROM settings WHERE guildid = ?", message.guild.id, (err, prefix) => {
    if (!reason) {
      reason = "None"
    }
    if(reason.length > 1300) return message.channel.send("Reason can't be more than 1300 characters.")
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
    if(User) {
        if(User.user.id == bot.user.id) return;
    channeldb.each("SELECT COUNT(*) AS count FROM logschannel WHERE guildid = ?", message.guild.id, (err, lchannel) => {
        if(lchannel.count > 0) {
          channeldb.each("SELECT * FROM logschannel WHERE guildid = ?", message.guild.id, (err, rchannel) => {
            if(message.member.highestRole.comparePositionTo(User.highestRole) > 0){
            let channelfound = message.guild.channels.find(c => c.id == `${rchannel.channelid}`)
            let embed = new Discord.RichEmbed()
            .setColor('#00d5ff')
            .setDescription(`**Logs**\n\n**Mod action:** Ban\n**Punished User:** ${User.user.tag} (${User.user.username})\n**Moderator:** ${message.author.tag} (${message.author.id})\n**Channel:** ${message.channel.name} (${message.channel.id})\n**Logged at:** ${message.createdAt}`)
       channelfound.sendEmbed(embed)
       var dm = new Discord.RichEmbed()
       .setAuthor(`${User.user.username}`, `${User.user.avatarURL}`)
  .setTitle("Command: Ban")
  .setColor('#00d5ff')
 // .setFooter(`Mute done by ${message.author.username} (${message.author.id})`)
 .setDescription(`**Ban was logged for ${User.user.username}** (${User.user.id}) at **${message.guild.name}**\n**Reason :-** ${reason}\n **Banned At :-** ${message.createdAt}`)
 User.sendEmbed(dm)
    message.delete(6000)
    User.ban({reason: reason})
    db.run("INSERT INTO infractions(punishedusername, punishedid, adminusername, adminid, type, infractionid, reason, guildid) VALUES(?,?,?,?,?,?,?,?)", User.user.username, User.user.id, message.author.username, message.author.id, "Ban", warnsID, reason, message.guild.id)
    message.channel.send(`**${User.user.username}** was successfully banned from the server.`).then(m => {
        m.delete(6000)

    })
} else {
    message.channel.send("This user has a higher role or the same role as yours.")
}
})
        }
        else {
            var dm = new Discord.RichEmbed()
            .setAuthor(`${User.user.username}`, `${User.user.avatarURL}`)
       .setTitle("Command: Ban")
       .setColor('#00d5ff')
      // .setFooter(`Mute done by ${message.author.username} (${message.author.id})`)
      .setDescription(`**Ban was logged for ${User.user.username}** (${User.user.id}) at **${message.guild.name}**\n**Reason :-** ${reason}\n **Banned At :-** ${message.createdAt}`)
      User.sendEmbed(dm)
            message.delete(6000)
            User.ban({reason: reason})
            db.run("INSERT INTO infractions(punishedusername, punishedid, adminusername, adminid, type, infractionid, reason, guildid) VALUES(?,?,?,?,?,?,?,?)", User.user.username, User.user.id, message.author.username, message.author.id, "Ban", warnsID, reason, message.guild.id)
            message.channel.send(`**${User.user.username}** has been successfully banned from the server.`)
        }
    })
} else {
    var unmute = new Discord.RichEmbed()
          
        .setTitle("Command: Ban")
        .setColor('#00d5ff')
        .setDescription(`Ban a member from your discord server!\n **USAGE** :- \n ${prefix.prefix}ban [Mentioned User or DISCORD ID] [reason] \n **Examples** :- \n${prefix.prefix}ban @Youssef Insulting`)
            
        message.channel.sendEmbed(unmute)
}
    })
}
module.exports.help = {
    name: "ban"
}
