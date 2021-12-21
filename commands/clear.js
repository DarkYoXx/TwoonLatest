const discord = require("discord.js");
module.exports.run = async(bot, message, args) => {
    let ammount = Math.round(args[0])
    if(!ammount) return message.channel.send("Type the number of messages you would like to delete.")
    if(ammount < 2) return;
    if(ammount > 100) return;
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
    message.channel.fetchMessages()
    message.delete()
    message.channel.bulkDelete(ammount).catch(error => {
        if(error.code == 50034) {
           message.channel.send("Failed to delete messages.\n`You can only bulk delete messages that are under 14 days old.`")
        } else {
            message.channel.send(`**${ammount}** messages were successfully deleted.`).then(m => {
                m.delete(5000)
            })
        }
   })

}
module.exports.help = {
    name: "clear"
}