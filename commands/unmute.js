const Discord = require("discord.js")
const sqlite3 = require("sqlite3").verbose()
let prefixdb = new sqlite3.Database("./commands/prefix.db")
module.exports.run = async(bot, message, args) => {
    let User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
    if(User == message.author) return;
    //if(User.bot) return;
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
    prefixdb.each("SELECT * FROM settings WHERE guildid = ?", message.guild.id, (err, prefix) => {
    if(!User) {
    var unmute = new Discord.MessageEmbed()
          
    .setTitle("Command: Unmute")
    .setColor('#00d5ff')
    .setDescription(`Unmute a discord member to allow him to chat in your server channels!\n **USAGE** :- \n ${prefix.prefix}unmute (Mentioned User or User ID)\n **Examples** :- \n${prefix.prefix}unmute @Youssef`)
        
    message.channel.send(unmute)
    } else {
        if(message.member.highestRole.comparePositionTo(User.highestRole) > 0){
        if(User.roles.some(role => role.name === 'Muted')) {
            User.removeRole(message.guild.roles.cache.find(c => c.name == "Muted"))
            message.channel.send(`**${User.user.tag}** was successfully unmuted by **${message.author.username}**`)
        } else {
            message.channel.send(`**${User.user.username}** is not muted.`).then(m => {
                m.delete(4000)
            })
        }
        } else {
            message.channel.send(`This user has a higher role than yours.`).then(m => {
                m.delete(4000)
            })
        }
    }

})
}
module.exports.help = {
    name: "unmute"
}