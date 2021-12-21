const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/infractions.db');
module.exports.run = async(bot, message, args) => {
 

  let user = message.mentions.members.first()



  

  
        

    
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
        if(user) {
          db.all("SELECT * FROM infractions WHERE punishedid = ? AND guildid = ?" , user.user.id, message.guild.id,
          (error, rows) => {
        
         // if(report.guildid == message.guild.id) {
          var allmsg = '';
          rows.forEach(function (row) {
              allmsg += `\nUser : **${row.punishedusername}**\nUser ID : **${row.punishedid}**\nInfraction given by : **${row.adminusername}**\nInfraction ID : **${row.infractionid}**\nInfraction Type : **${row.type}**\nReason : **${row.reason}**\nTimestamp : **${row.timestamp}**\n--------------------------------`
        
          })
          message.channel.send({
            embed: {
                title: `Infraction Logs`,
                color: 3447003,
                description: `${allmsg}`
            }
        })
            
          })
        
        } else {
          let idUser = args[0]
          if(idUser) {
          db.all("SELECT * FROM infractions WHERE punishedid = ? AND guildid = ?" , idUser, message.guild.id,
          (error, report) => {
        
         // if(report.guildid == message.guild.id) {
  
            message.channel.send(" ```INFRACTION ID    -    TYPE    -    REASON    -    Given By ```")
            report.forEach((row) => {
              message.channel.send(" ```#"+row.infractionid+"   -    "+row.type+"   -    "+row.reason+"   -    "+row.adminusername+"```");
            
            }) 
          })
        }
      }
      }
  
module.exports.help = {
    name: "infr"
}
