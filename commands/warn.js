const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/infractions.db');
let prefixdb = new sqlite3.Database('./commands/prefix.db');
let channeldb = new sqlite3.Database("./commands/logschannel.db")
module.exports.run = async (bot, message, args) => {
    
    prefixdb.each("SELECT * FROM settings WHERE guildid = ?", message.guild.id, (err, prefix) => {
    
        let rreason = args.slice(1).join(" ");
    db.each("SELECT COUNT(*) AS count FROM infractions HWERE guildid = ?", message.guild.id, (err, infrcount) => {

    
        let warnsID = Math.floor(Math.random() * 5000)
    let rUser = message.mentions.members.first();

    
    if(message.author.bot) return;
    if(rreason.length > 1000) return message.channel.send("Reason can't be more than 1000 characters.")
   // if(!rUser) return message.reply("Couldn't find the mentioned member.");
   
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
     
        if(rUser) {
            if(rreason) {
                if(message.member.highestRole.comparePositionTo(message.mentions.members.first().highestRole) > 0){
                    if(rUser.user.id == bot.user.id) return;
              let time = message.createdAt
              
              
              
        db.run("INSERT INTO infractions(punishedusername, punishedid, adminusername, adminid, type, infractionid, reason, guildid) VALUES(?,?,?,?,?,?,?,?)", rUser.user.username, rUser.user.id, message.author.username, message.author.id, "Warn", warnsID, rreason, message.guild.id)
        var unmutedd = new Discord.RichEmbed()
           .setAuthor(`${rUser.user.username}`, `${rUser.user.avatarURL}`)
            .setTitle("Command: Warn")
            .setColor('#00d5ff')
            .setDescription(`**Infraction#${warnsID}**\nUser **${rUser.user.username}** was successfully warned for the following reason :- **${rreason}**`)
            message.channel.sendEmbed(unmutedd)
            var unmuted = new Discord.RichEmbed()
                 .setAuthor(`${rUser.user.username}`, `${rUser.user.avatarURL}`)
            .setTitle("Command: Warn")
            .setColor('#00d5ff')
           // .setFooter(`Mute done by ${message.author.username} (${message.author.id})`)
           .setDescription(`**Warn was logged for ${rUser.user.username}** (${rUser.user.id}) at **${message.guild.name}\n**Reason :-** ${rreason}\n **Warned At :-** ${message.createdAt}**`)
           rUser.sendEmbed(unmuted)
         
                } else {
                    message.channel.sendEmbed(`${rUser.user.username} has a higher role than you.`)
                }
           
        }
        }
    
        if(!rUser) {
            let idUser = args[0]
            if(idUser) {
                let user = message.guild.members.fetch(idUser).then(us => {

                
                if(rreason) {
                    //if(user.bot) return;
                    if(message.member.highestRole.comparePositionTo(us.highestRole) > 0){
                        if(us.id == bot.user.id) return;
            let time = message.createdAt
            db.run("INSERT INTO infractions(punishedusername, punishedid, adminusername, adminid, type, infractionid, reason, guildid) VALUES(?,?,?,?,?,?,?,?)", us.user.username, us.id, message.author.username, message.author.id, "Warn", warnsID, rreason, message.guild.id)
            var unmutedd = new Discord.RichEmbed()
               .setAuthor(`${us.user.username}`, `${us.user.avatarURL}`)
                .setTitle("Command: Warn")
                .setColor('#00d5ff')
                .setDescription(`**Infraction#${warnsID}**\nUser **${us.user.username}** was successfully warned for the following reason :- **${rreason}**`)
                message.channel.sendEmbed(unmutedd)
                var unmuted = new Discord.RichEmbed()
                     .setAuthor(`${us.user.username}`, `${us.user.avatarURL}`)
                .setTitle("Command: Warn")
                .setColor('#00d5ff')
               // .setFooter(`Mute done by ${message.author.username} (${message.author.id})`)
               .setDescription(`**Warn was logged for ${us.user.username}** (${us.user.id}) at **${message.guild.name}\n**Reason :-** ${rreason}\n **Warned At :-** ${message.createdAt}**`)
               user.sendEmbed(unmuted)
           
                    } else {
                        message.channel.send(`${us.username} has a higher role than you.`)
                    }
                }
            })
            }
        
        }
        if(!rUser) {
            let idUser = args[0]
            if(idUser){
                let user = message.guild.members.cache.find(c => c.id == idUser)
            if(!rreason){
                if(message.member.highestRole.comparePositionTo(user.user.highestRole) > 0){
                    if(user.user.id == bot.user.id) return;
                    let time = message.createdAt
                    db.run("INSERT INTO infractions(punishedusername, punishedid, adminusername, adminid, type, infractionid, reason, guildid) VALUES(?,?,?,?,?,?,?,?)", user.user.username, user.user.id, message.author.username, message.author.id, "Warn", warnsID, "None",message.guild.id)
            var unmutedd = new Discord.RichEmbed()
               .setAuthor(`${user.user.username}`, `${user.user.avatarURL}`)
                .setTitle("Command: Warn")
                .setColor('#00d5ff')
                .setDescription(`**Infraction#${warnsID}**\nUser **${user.user.username}** was successfully warned.`)
                message.channel.sendEmbed(unmutedd)
                var unmuted = new Discord.RichEmbed()
                     .setAuthor(`${user.user.username}`, `${user.user.avatarURL}`)
                .setTitle("Command: Warn")
                .setColor('#00d5ff')
               // .setFooter(`Mute done by ${message.author.username} (${message.author.id})`)
               .setDescription(`**Warn was logged for ${user.user.username}** (${user.user.id}) at **${message.guild.name}\n**Reason :-** None\n **Warned At :-** ${message.createdAt}**`)
               user.sendEmbed(unmuted)
                }
                else {
                    message.channel.send(`${user.user.username} has a higher role than you.`)
                }
        }
    }
}    
        
    if(rUser){
        if(!rreason) {
            if(message.member.highestRole.comparePositionTo(message.mentions.members.first().highestRole) > 0){
                if(rUser.user.id == bot.user.id) return;
            let time = message.createdAt
        db.run("INSERT INTO infractions(punishedusername, punishedid, adminusername, adminid, type, infractionid, reason, guildid) VALUES(?,?,?,?,?,?,?,?)", rUser.user.username, rUser.user.id, message.author.username, message.author.id, "Warn", warnsID, "None",message.guild.id)
var unmutedd = new Discord.RichEmbed()
   .setAuthor(`${rUser.user.username}`, `${rUser.user.avatarURL}`)
    .setTitle("Command: Warn")
    .setColor('#00d5ff')
    .setDescription(`**Infraction#${warnsID}**\nUser **${rUser.user.username}** was successfully warned.`)
    message.channel.sendEmbed(unmutedd)
    var unmuted = new Discord.RichEmbed()
         .setAuthor(`${rUser.user.username}`, `${rUser.user.avatarURL}`)
    .setTitle("Command: Warn")
    .setColor('#00d5ff')
   // .setFooter(`Mute done by ${message.author.username} (${message.author.id})`)
   .setDescription(`**Warn was logged for ${rUser.user.username}** (${rUser.user.id}) at **${message.guild.name}\n**Reason :-** None\n **Warned At :-** ${message.createdAt}**`)
   rUser.sendEmbed(unmuted)
            } else {
                message.channel.send(`${rUser.user.username} has a higher role than you.`)
            }
    
        }
      }


if(!rUser) {
    if(!rreason) {
    var unmute = new Discord.RichEmbed()
    
    .setTitle("Command: Warn")
    .setColor('#00d5ff')
    .setDescription(`Warn a discord member!\n **USAGE** :- \n ${prefix.prefix}warn [user] (Mentioned User) [reason] \n **Examples** :- \n${prefix.prefix}warn @Youssef Disrespecting staff.`)
        
    message.channel.send(unmute) 
    }
}
})
    })
}
module.exports.help = {
name: "warn"
}
