const discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database("./commands/filter.db")
db.run("CREATE TABLE IF NOT EXISTS filter(userid TEXT, guildid TEXT, word TEXT, id TEXT)")
module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return;
    let word = args[0]
    let id = Math.floor((Math.random() * 4000 ) + 10)
    let reaction = bot.emojis.get("675070902106324994")
    let check = bot.emojis.get("740988081330454670")
    if(!word) return message.channel.send(`You cant set an empty chat filter! ${reaction}`)
    if(word) {
      
        db.run("DELETE FROM filter WHERE word = ? AND guildid = ?", word, message.guild.id)
        db.run("INSERT INTO filter(userid, guildid, word, id) VALUES(?,?,?,?)", message.author.id, message.guild.id, word, id, (error) => {
           
                
                message.channel.send(`Word was successfully added to the filter database for your server ${check}`)
            })
      

        }
   


       // if(error){
          //  if(message.guild.id !== bug.guildid) {
            //    db.run("INSERT INTO filter(userid, guildid, word, id) VALUES(?,?,?,?)", message.author.id, message.guild.id, word, id)
            //    
         //   } else {
           //     message.channel.send(`Word already exists`)
         //   }
     //   }
  //  })
//})
   // }

    
}
module.exports.help = {
    name: "addword"
}