const Discord = require("discord.js")
module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    let rrole = message.guild.roles.find(c => c.name == "@everyone");

   
    message.channel.overwritePermissions(rrole.id, {

    
        SEND_MESSAGES: true
     })
message.channel.send("**Permissions Changed for**`#"+message.channel.name+"`\n `SEND MESSAGES: TRUE` \n `ADD REACTIONS: TRUE`")
}

module.exports.help = {
    name: "unlock"
}