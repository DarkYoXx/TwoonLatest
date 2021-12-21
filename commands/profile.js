const Discord = require("discord.js");
const Canvas = require('canvas');

const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./credits.db');
module.exports.run = async (bot, message, args) => {



    let User = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0])

    if(!User) {
        db.each('SELECT * FROM credits WHERE userid = ?', message.author.id, async (err, row) => {

            const canvas = Canvas.createCanvas(500, 500);
            Canvas.registerFont('TrenchThin-aZ1J.ttf', {family: 'trench'});
            Canvas.registerFont('timeburnerbold.ttf', {family: 'timeburner'});
        
            const context = canvas.getContext('2d');
            
            const background = await Canvas.loadImage('twoon_profile.png');
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
        
    
        if(row.credits > 999 && row.credits < 1000000) {
              ccs = (row.credits/1000).toFixed(1) + 'K'; 
        }
    
         if(row.credits > 1000000) {
             ccs = (row.credits/1000000).toFixed(1) + 'M';
         }
        if(row.credits < 999) {
             ccs = row.credits
        }
        
          
        context.font = '45px timeburner';
    context.fillStyle = '#ffffff';
    context.fillText(`${ccs}`, 50, 263);
    
    
    context.font = '45px timeburner';
    context.fillStyle = '#ffffff';
    context.fillText(`${message.author.username}'s`, 260, 67);
    
    
    context.beginPath();
        context.arc(68, 104, 58.5, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
    
    
    
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL);
        context.drawImage(avatar, 9, 46, 117, 117);
    
       
    
    
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'twoon-profile.png');
    
       message.channel.send(attachment)
    
    
    
    })
     
    } else {
    
       
    
    
    db.each('SELECT * FROM credits WHERE userid = ?', User.user.id, async (err, row) => {

        const canvas = Canvas.createCanvas(500, 500);
        Canvas.registerFont('TrenchThin-aZ1J.ttf', {family: 'trench'});
        Canvas.registerFont('timeburnerbold.ttf', {family: 'timeburner'});
    
        const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('twoon_profile.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);


       

    if(row.credits > 999 && row.credits < 1000000) {
          ccs = (row.credits/1000).toFixed(1) + 'K'; 
    }

     if(row.credits > 1000000) {
         ccs = (row.credits/1000000).toFixed(1) + 'M';
     }
    if(row.credits < 999) {
         ccs = row.credits
    }





   

    
    

      
    context.font = '45px timeburner';
context.fillStyle = '#ffffff';
context.fillText(`${ccs}`, 50, 263);

context.font = '45px timeburner';
context.fillStyle = '#ffffff';
context.fillText(`${ccs}`, 50, 263);

context.font = '45px timeburner';
context.fillStyle = '#ffffff';
context.fillText(`${User.user.username}'s`, 260, 67);

context.beginPath();
    context.arc(68, 104, 58.5, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    
    const avatarrrr = await Canvas.loadImage(User.user.displayAvatarURL);
   context.drawImage(avatarrrr, 9, 46, 117, 117);


    context.beginPath();
    context.arc(150, 42, 22, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    let image2 = await Canvas.loadImage(message.guild.iconURL);
   context.drawImage(image2, 128, 20, 44, 44); 

  
    
    

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'twoon-profile.png');

   
        
   message.channel.send(attachment)



})
 

    }

}
 
module.exports.help = {
    name: "profile"
}

