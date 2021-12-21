const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./credits.db');

const timeSet = new Set();
module.exports.run = async (bot, message, args) => {
  //  if(!message.member.hasPermission('ADMINISTRATOR')) return;
    let text = args.slice(0).join(" ");
    if(!text) return message.channel.send("No text found")
    if(text.length > 250) return message.channel.send("Text can't be more than 250 characters.")
    

    
    if(timeSet.has(message.author.id)){
        message.channel.send(`${message.author.username}, you've already used this command today, please wait **24** hours before trying again.`)
        setTimeout(() => {
          timeSet.delete(message.author.id)
        }, 8.64e+7)
       
      } else {
    
      
       
        timeSet.add(message.author.id)
        message.delete()
    message.channel.send(`First one to re-send this message wins **500$ CREDITS**\n\n${text}`)
    
    const filter = m => m.content == `${text}`;
const collector = message.channel.createMessageCollector(filter, {max:2001, maxMatches:2, time: 60000});

collector.on('collect', m => {
    if(m.author.bot) return;
    message.channel.send(`Congratulations **${m.author.username}**! You won the game in addition to **500$ CREDITS**!`);
    db.run("UPDATE credits SET credits = credits+500 WHERE userid = ?", m.author.id)
})
}
}
module.exports.help = {
    name: "msgame"
}
