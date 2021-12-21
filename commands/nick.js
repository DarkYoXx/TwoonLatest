const Discord = require("discord.js");
module.exports.run = async(bot, message, args) => {
   let user = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0])
   let nickname = args[1]
   if(!message.member.hasPermission("MANAGE_NICKNAMES")) return;
   if(!user) return message.channel.send("Please mention or type ID of the member.")
   if(!nickname) return message.channel.send("Please type the nickname.")
   if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("Failed to change nickname, bot is missing `MANAGE_NICKNAMES` permission.")
   if(user) {
       
       user.setNickname(nickname).catch(error => {
           if(!error.code !== 50013) {
            message.channel.send("done")
           }
           if(error.code == 50013) {
               message.channel.send("Missing perms")
           }
       })
     //  message.channel.send(`**${user.user.username}** nickname was successfully changed to ${nickname}`)
      // } else {
     //   message.channel.send("Failed to change nickname, bot is missing `MANAGE_NICKNAMES` permission.")
     //  }
//
    
   
           
      
   }
}
module.exports.help = {
    name: "nick"
}