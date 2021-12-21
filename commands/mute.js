const Discord = require("discord.js.old");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/infractions.db');
let prefixdb = new sqlite3.Database('./commands/prefix.db');
let channeldb = new sqlite3.Database('./commands/logschannel.db')
db.run("CREATE TABLE IF NOT EXISTS infractions (punishedusername TEXT, punishedid TEXT, adminusername TEXT, adminid TEXT, type TEXT, mutetime TEXT, infractionid TEXT, reason TEXT, guildid TEXT, timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)")
module.exports.run = async (bot, message, args) => {
 
  prefixdb.each("SELECT * FROM settings WHERE guildid = ?", message.guild.id, (err, prefix) => {
    let User = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0])
    
    let mutetime = args[1]
    let reason = args.slice(2).join(" ")
    let infractionid = Math.floor(Math.random() * 5000)
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
    let muterole = message.guild.roles.find(role => role.name == "Muted")
    if(User == message.author) return;
    
    
    if(!muterole) {
     message.guild.createRole ({
      name: "Muted",
      color: "#000000",
      permissions: "READ_MESSAGES"
    })
  }
  if(muterole) {
    message.guild.channels.forEach(c => {
      
      c.overwritePermissions(muterole.id, 
        {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
      })
    })
  }
    if(!User) {
      var syntax = new Discord.RichEmbed()
          
      .setTitle("Command: Mute")
      .setColor('#00d5ff')
      .setDescription(`Mute a discord member to prevent him from sending messages in text channels!\n **USAGE** :- \n ${prefix.prefix}mute [user] (Mentioned User or User ID) [time - optional] [reason - optional] \n **Examples** :- \n${prefix.prefix}mute @Youssef 10s Spamming.\n${prefix.prefix}mute 546316934187057163 1h Insulting.`)
      message.channel.sendEmbed(syntax)
  }
  if(!mutetime) {
    mutetime = "24d"
  }
  if(!reason) {
    reason = "None"
  }
  if(reason.length > 1000) return message.channel.send("Reason can't be more than 1000 characters.")
  if(User) {
    if(User.user.id == bot.user.id) return;
    if (User.roles.find(role => role.name === 'Muted')) {
      message.channel.send("User is already muted.")
    } else {
      channeldb.each("SELECT COUNT(*) AS count FROM logschannel WHERE guildid = ?", message.guild.id, (err, cchannel) => {
        if(cchannel.count > 0) {
          channeldb.each("SELECT * FROM logschannel WHERE guildid = ?", message.guild.id, (err, offchannel) => {

          
          if(message.member.highestRole.comparePositionTo(User.highestRole) > 0){
            
            
    
            var dm = new Discord.RichEmbed()
         .setAuthor(`${User.user.username}`, `${User.user.avatarURL}`)
    .setTitle("Command: Mute")
    .setColor('#00d5ff')
   // .setFooter(`Mute done by ${message.author.username} (${message.author.id})`)
   .setDescription(`**Mute was logged for ${User.user.username}** (${User.user.id}) at **${message.guild.name}**\n**Reason :-** ${reason}\n**Mute Time:-** ${ms(ms(mutetime))}\n **Muted At :-** ${message.createdAt}`)
   var public = new Discord.RichEmbed()
   .setAuthor(`${User.user.username}`, `${User.user.avatarURL}`)
    .setTitle("Command: Mute")
    .setColor('#00d5ff')
    .setDescription(`**Infraction#${infractionid}**\nUser **${User.user.username}** was successfully muted for the following reason :- **${reason}**`)
    User.sendEmbed(dm)
    message.channel.send(public)
    User.addRole(message.guild.roles.find(c => c.name == "Muted"))
    let foundchannel = message.guild.channels.find(ch => ch.id == `${offchannel.channelid}`)
    let logs = new Discord.RichEmbed()
            .setColor('#00d5ff')
            .setDescription(`**Logs**\n\n**Mod action:** Mute\n**Punished User:** ${User.user.tag} (${User.user.username})\n**Moderator:** ${message.author.tag} (${message.author.id})\n**Channel:** ${message.channel.name} (${message.channel.id})\n**Logged at:** ${message.createdAt}`)
       foundchannel.sendEmbed(logs)
       db.run("INSERT INTO infractions(punishedusername, punishedid, adminusername, adminid, type, mutetime, infractionid, reason, guildid) VALUES(?,?,?,?,?,?,?,?,?)", User.user.tag, User.user.id, message.author.tag, message.author.id, "Mute", mutetime, infractionid, reason, message.guild.id)
    setTimeout(function(){
      let endmute = new Discord.RichEmbed()
      .setTitle("Command: Mute")
    .setColor('#00d5ff')
    .setDescription(`Your mute time ended at **${message.guild.name}** server.`)
      User.removeRole(message.guild.roles.find(c => c.name == "Muted"))
      User.sendEmbed(endmute)
    }, ms(mutetime))
          } else {
            message.channel.send(`This user has a higher role or a same role as yours.`)
          }
        })
        } else {
          var dm = new Discord.RichEmbed()
          .setAuthor(`${User.user.username}`, `${User.user.avatarURL}`)
     .setTitle("Command: Mute")
     .setColor('#00d5ff')
    // .setFooter(`Mute done by ${message.author.username} (${message.author.id})`)
    .setDescription(`**Mute was logged for ${User.user.username}** (${User.user.id}) at **${message.guild.name}**\n**Reason :-** ${reason}\n**Mute Time:-** ${ms(ms(mutetime))}\n **Muted At :-** ${message.createdAt}`)
    var public = new Discord.RichEmbed()
    .setAuthor(`${User.user.username}`, `${User.user.avatarURL}`)
     .setTitle("Command: Mute")
     .setColor('#00d5ff')
     .setDescription(`**Infraction#${infractionid}**\nUser **${User.user.username}** was successfully muted for the following reason :- **${reason}**\n**Note**: You can activate moderation logs easily by using **>setlogschannel** command.`)
     User.sendEmbed(dm)
     message.channel.send(public)
     User.addRole(message.guild.roles.find(c => c.name == "Muted"))
        db.run("INSERT INTO infractions(punishedusername, punishedid, adminusername, adminid, type, mutetime, infractionid, reason, guildid) VALUES(?,?,?,?,?,?,?,?,?)", User.user.tag, User.user.id, message.author.tag, message.author.id, "Mute", mutetime, infractionid, reason, message.guild.id)
     setTimeout(function(){
       let endmute = new Discord.RichEmbed()
       .setTitle("Command: Mute")
     .setColor('#00d5ff')
     .setDescription(`Your mute time ended at **${message.guild.name}** server.`)
       User.removeRole(message.guild.roles.find(c => c.name == "Muted"))
       User.sendEmbed(endmute)
     }, ms(mutetime))
        }
      

      
    })
  }
}
  })

}
module.exports.help = {
name: "mute"
}
