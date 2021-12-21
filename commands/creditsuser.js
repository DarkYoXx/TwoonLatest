const Discord = require("discord.js");
const Canvas = require('canvas');

const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./credits.db');
module.exports.run = async (bot, message, args) => {
    let react = bot.emojis.get("741688971729305660")
    let check = bot.emojis.get("740988081330454670")
    let cUser = message.mentions.members.first()
    let money = args[1]
    let alphaone = ["2", "3" ,"4", "5", "6", "7", "8", "9", "0"]
    let alphatwo = ["2", "3" ,"4", "5", "6", "7", "8", "9", "0"]
    let alphathree =["2", "3" ,"4", "5", "6", "7", "8", "9", "0"]
    let alphafour = ["2", "3" ,"4", "5", "6", "7", "8", "9", "0"]
    let numbers = ["2", "3" ,"4", "5", "6", "7", "8", "9", "0"]
    let ran1 = Math.floor(Math.random() * alphaone.length);
    let ran2 = Math.floor(Math.random() * alphatwo.length);
    let ran3 = Math.floor(Math.random() * alphathree.length);
    let ran4 = Math.floor(Math.random() * alphafour.length);
    let ran5 = Math.floor(Math.random() * numbers.length);
let result = alphaone[ran1] + alphatwo[ran2] + alphathree[ran3] + alphafour[ran4] + numbers[ran5]




    const canvas = Canvas.createCanvas(700, 250);
    Canvas.registerFont('Netron.ttf', {family: 'netron'});

	const context = canvas.getContext('2d');
    
	const background = await Canvas.loadImage('twoon_verify.png');
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.font = '48px netron';
	context.fillStyle = '#ffffff';
	context.fillText(`${result}`, 255, 177);



	const attachment = new Discord.Attachment(canvas.toBuffer(), 'twoon-captcha.png');

   


    db.each("SELECT * FROM credits WHERE userid = ?", message.author.id,
    (error, lol) => {
	            if(money == "0") return;
        if(lol.credits !== "") {
    
    if(cUser) {
        if(cUser.user.bot) return message.channel.send(`Bots don't have credits, **${message.author.username}**.`)
        if(cUser.user.id == message.author.id) return message.channel.send(`You can't transfer credits to yourself, **${message.author.username}**.`)
        if(money) {
            if(isNaN(money)) return message.channel.send("Only numbers are allowed.")
            db.each("SELECT * FROM credits WHERE userid = ?", message.author.id,
    (error, transfer) => {
        if(transfer.credits >= money) {
            let taxmoney = Math.ceil(money*0.03)
            let transmoney = money-taxmoney
            const filter = m => m.content.includes(result);
            const collector = message.channel.createMessageCollector(filter, {max : 2, time: 10000});
    
            message.channel.send(`**${message.author.username}**, please confirm transferring **${money}$** from your account to **${cUser.user.username}** by solving the following captcha (Transfer Fee : **${taxmoney}**) \n\n `, attachment).then(msg => {
                setTimeout(function(){
                   msg.delete()
                }, 10000)
                collector.on('collect', m => { 
                    if(m.author.id !== message.author.id) return;
                    message.channel.send(`**${m.author.username}**, you successfully transferred **${transmoney}$** to **${cUser.user.username}** ${check}`)
                                db.run(`UPDATE credits SET credits = credits-${money} WHERE userid = ?`, m.author.id)
                                msg.delete()
                                db.run(`UPDATE credits SET credits = credits+${transmoney} WHERE userid = ?`, cUser.user.id)
                                db.run(`UPDATE credits SET credits = credits+${taxmoney} WHERE userid = ?`, "546316934187057163")

                                m.delete()
                })
                
         })
         
            
        } else {
            if(transfer.credits <= money){
                message.channel.send("You don't have enough credits to transfer.")
            }
        }
    })
}
    }
 
    if(cUser) {
        if(!money) {
    db.each("SELECT * FROM credits WHERE userid = ?", cUser.user.id,
    (error, row) => {
        message.channel.send(react + " | **" + cUser.user.username + "** currently has **`" + row.credits + "$`** in his account.")
    })
}
    
}
    if(!cUser) {
        if(!money) {
            
        db.each("SELECT * FROM credits WHERE userid = ?", message.author.id,
    (error,rows) => {
    message.channel.send(react + " | **" + message.author.username + "**, you currently have **`" + rows.credits + "$`** in your account.")
    
    })
}
    }
        } else {
            message.channel.send(`**${message.author.username}**, you currently don't have any credits, you can get credits daily by using the **>daily** command.`)
        }
    })
}
 
module.exports.help = {
    name: "credits",
    aliases: 'credit'

}

