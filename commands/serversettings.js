const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/serversettings.db');
db.run("CREATE TABLE IF NOT EXISTS settings (guildid TEXT, invitelink TEXT, prefix TEXT, invitetext TEXT)")
module.exports.run = async (bot, message, args) => {
    let invitelink = args[0]
    let invitetext = args.slice(1).join(" ");
    if(!invitelink) return message.channel.send(`You must add your discord server invitation.`)
    if(!invitelink.includes("discord.gg")) return message.channel.send("Only `discord.gg` links are allowed.")
    if(!invitetext) {
        invitetext = ""
    }
    if(invitetext.length > 600) return message.channel.send("Invitation text can't be more than 600 characters.")
    if(message.member.hasPermission('ADMINISTRATOR')) {
    db.run("DELETE FROM settings WHERE guildid = ?", message.guild.id)
    db.run("INSERT INTO settings(guildid,invitelink,invitetext) VALUES(?,?,?)", message.guild.id, invitelink, invitetext)
    message.channel.send(`Server Settings changed into :- \n Invite Text : ${invitetext} \n Invite Link : ${invitelink}`)
    } else {
        return;
    }

}
module.exports.help = {
    name : "setlink"
}