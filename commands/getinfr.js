const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/infractions.db');
module.exports.run = async (bot, message, args) => {

    //let rUser = message.mentions.members.first();
    let id = args[0]
    if(!id) return message.channel.send("Please enter Infraction ID.")
    if(isNaN(id)) return message.channel.send("Infraction IDs are numbers.")
    if(id.length > 4) return message.channel.send("Infraction ID can't be more than four numbers.")
    db.each("SELECT COUNT(*) AS count FROM infractions WHERE infractionid = ?", id, (err, lol) => {
if(lol.count > 0) {
    
    db.each("SELECT * FROM infractions WHERE infractionid = ?",id, 
    (error, row) => {
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
       if(message.guild.id !== row.guildid) return message.channel.send("Wrong infraction id!")
        var idembed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
      .setTitle(`Infraction Number #${row.infractionid}`)
        .setDescription(`**Infraction Logged for ${row.punishedusername}** (${row.punishedid})\n**Infraction Type :-** ${row.type}\n**Reason :-**${row.reason} \n**Infraction done by :-** ${row.adminusername} (${row.adminid})\n **Infraction logged at :-** ${row.timestamp} \n**Infraction ID :-**${row.infractionid}`)
          .setColor('#00d5ff')
        message.channel.sendEmbed(idembed);

  })
} else {
  message.channel.send("Infraction not found, please enter a valid ID.")
}
})
}

module.exports.help = {
    name: "getinfr"
}
