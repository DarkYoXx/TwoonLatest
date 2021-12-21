const Discord = require("discord.js")
const sqlite3 = require("sqlite3").verbose()
let dbs = new sqlite3.Database('./credits.db');
let db = new sqlite3.Database('./commands/infractions.db');
module.exports.run = async(bot, message, args) => {
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    dbs.each("SELECT COUNT(*) AS count FROM credits where userid = ?", message.author.id, (err, ccount) => {

    
    if(user) {
        if(user.user.bot) return message.channel.send(`Sorry, you cant view bots' info.`)
        if(ccount.count == 0) {
                db.each("SELECT COUNT(*) AS count FROM infractions WHERE punishedid = ? AND guildid = ?", user.user.id, message.guild.id, (err, infrs)=>{
    
    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.user.username}'s Info`, `${user.user.avatarURL}`)
.setDescription(`**User Info**\nCreated: ${user.user.createdAt}\nID/Profile: ${user.user} (${user.user.id})\nJoined At: ${user.joinedAt}\n\n**Counts**\nCredits: 0\nInfractions: ${infrs.count}`)
.setColor('#00d5ff')
message.channel.sendEmbed(embed)
        })

} else {
    dbs.each("SELECT * FROM credits WHERE userid = ?", user.user.id, (err, lol)=> {
        db.each("SELECT COUNT(*) AS count FROM infractions WHERE punishedid = ? AND guildid = ?", user.user.id, message.guild.id, (err, infrs)=>{
            let embed = new Discord.RichEmbed()
            .setAuthor(`${user.user.username}'s Info`, `${user.user.avatarURL}`)
        .setDescription(`**User Info**\nCreated: ${user.user.createdAt}\nID/Profile: ${user.user} (${user.user.id})\nJoined At: ${user.joinedAt}\n\n**Counts**\nCredits: ${lol.credits}\nInfractions: ${infrs.count}`)
        .setColor('#00d5ff')
        message.channel.sendEmbed(embed)
        })
    })
}
        
       
   
            

        } else {
            if(ccount.count == 0) {
                db.each("SELECT COUNT(*) AS count FROM infractions WHERE punishedid = ? AND guildid = ?", message.author.id, message.guild.id, (err, infr)=>{
                let embed = new Discord.RichEmbed()
                .setAuthor(`${message.author.username}'s Info`, `${message.author.avatarURL}`)
                .setDescription(`**User Info**\nCreated: ${message.author.createdAt}\nID/Profile: ${message.author} (${message.author.id})\nJoined At: ${message.member.joinedAt}\n\n**Counts**\nCredits: 0\nInfractions: ${infr.count}`)
                .setColor('#00d5ff')
            message.channel.sendEmbed(embed)
            
                })

               
                } else {
                    dbs.each("SELECT * FROM credits WHERE userid = ?", message.author.id, (err, row)=> {
                        db.each("SELECT COUNT(*) AS count FROM infractions WHERE punishedid = ? AND guildid = ?", message.author.id, message.guild.id, (err, infr)=>{
                    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}'s Info`, `${message.author.avatarURL}`)
                    .setDescription(`**User Info**\nCreated: ${message.author.createdAt}\nID/Profile: ${message.author} (${message.author.id})\nJoined At: ${message.member.joinedAt}\n\n**Counts**\nCredits: ${row.credits}\nInfractions: ${infr.count}`)
                    .setColor('#00d5ff')
                message.channel.sendEmbed(embed)
                    })
                })
                }
            }
        })
    
                  
}
module.exports.help = {
    name: "info"
}