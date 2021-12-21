const Discord = require("discord.js")
const sqlite3 = require("sqlite3").verbose()
let prefixdb = new sqlite3.Database("./commands/prefix.db")
module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
   
    prefixdb.each("SELECT * FROM settings WHERE guildid = ?", message.guild.id, (err, prefix) => {

            
        
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`)
        .setDescription(`**Server Info**\nCreated: ${message.guild.createdAt}\nGuild Name/ID: ${message.guild.name} (${message.guild.id})\nOwner: ${message.guild.owner.username} (${message.guild.owner.id})\nRegion: ${message.guild.region}\n\n **Counts:**\nMembers: ${message.guild.members.size}\nEmojis: ${message.guild.emojis.size}\nText Channels: ${message.guild.channels.filter((c) => c.type === "text").size}\nVoice Channels: ${message.guild.channels.filter((c) => c.type === "voice").size}\nRoles: ${message.guild.roles.size}`)
        .setColor('#00d5ff')
    message.channel.send(embed)
    })
}
module.exports.help = {
    name: "serverinfo"
}