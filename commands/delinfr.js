const Discord = require("discord.js");

const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/infractions.db');
module.exports.run = async (bot, message, args) => {
   
    let id = args[0]
   
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
    if(!id) return message.channel.send("Please type the Infraction ID.")
    if(isNaN(id)) return message.channel.send("Infraction IDs are numbers.")
    if(id.length > 4) return message.channel.send("Infraction ID can't be more than four numbers.")
    db.each("SELECT COUNT(*) AS count FROM infractions WHERE infractionid = ?", id, (err, lol) => {
if(lol.count > 0) {
    db.each("SELECT * FROM infractions WHERE infractionid = ?",id, 
  (error, row) => {
      if(error) return console.log(error)
 
  
    db.run('DELETE from infractions WHERE infractionid = ?', id)
       
        var delembed = new Discord.RichEmbed()
      .setTitle("Infraction notification")
      .setDescription(`Infraction ID **${id}** logged for **${row.punishedusername}** has been successfully deleted.`)
      .setColor('#00d5ff')
      message.channel.sendEmbed(delembed)
 
    })
  } else {
    message.channel.send("Infraction not found, please enter a valid ID.")
  }
  })
    
}
module.exports.help = {
    name: "delinfr"
}
