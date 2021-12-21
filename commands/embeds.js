const discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let color = args[0]

    let text = args.slice(1).join(" ")
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if(!color){
        color = "#ffffff"
    }
if(!text) {
    text = "You can use this command by typing **>embed #hex text**"
}
    if(color){

        if(text) {
    let embed = new discord.RichEmbed()
    .setColor(color)
    .setDescription(text)
   

    message.channel.sendEmbed(embed)
        }
    }

}
module.exports.help = {
    name: "embed"
}