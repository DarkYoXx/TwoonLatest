

//COPYRIGHTS RESERVED FOR HAWK ( TWOON BOT )
  


const Discord = require("discord.js");
const sqlite3 = require("sqlite3").verbose()
const ms = require("ms");
let db = new sqlite3.Database('./commands/rpcgame.db');
let dbs = new sqlite3.Database('./credits.db');
module.exports.run = async (bot, message, args) => { 
  db.each("SELECT COUNT(*) AS count FROM rpcset WHERE userid = ?", message.author.id,
  (error, lol) => {
    if(lol.count > 0) {
  db.each("SELECT * FROM rpcset WHERE userid = ?", message.author.id,
  (error, row) => {
    dbs.each("SELECT * FROM credits WHERE userid = ?", message.author.id, (error,lm) => {
    let winnermoney = row.money*2
    let losermoney = row.money
    let drawmoney = row.money
var move = args[0]
var botmoves = ["rock", "paper", "scissors"];
var ran = Math.floor(Math.random() * botmoves.length);
if(lm.credits < row.money) return message.channel.send("You don't have enough money to play, please change your bet.")
  if(!move) return message.channel.send("What's your move? [rock, paper, scissors]\n Ex: >play rock")
  if(move == "paper") {
     if(botmoves[ran] == "paper") {
message.channel.send(`Paper, its a Draw!\n${drawmoney} were re-added to your account.`)
    } else {
      if(botmoves[ran] == "rock") {
        message.channel.send(`Rock, you won!\n${winnermoney} were added to your account`)
        
        dbs.run(`UPDATE credits SET credits = credits+${winnermoney} WHERE userid = ?`, message.author.id)
        } else {
          if(botmoves[ran] == "scissors") {
            if(lm.credits < losermoney) return message.channel.send("Not enough credits.")
            message.channel.send(`Scissors, better luck next time!\n${losermoney} credits were deduced from your account.`)
           
            dbs.run(`UPDATE credits SET credits = credits-${losermoney} WHERE userid = ?`, message.author.id)
            }
          }
      
        }
}
if(lm.credits < row.money) return message.channel.send("You don't have enough money to play, please change your bet.")
  if(move == "rock") {
     if(botmoves[ran] == "rock") {
message.channel.send(`Rock, its a Draw!\n${drawmoney} were re-added to your account.`)
    } else {
      if(botmoves[ran] == "scissors") {
        message.channel.send(`Scissors, you won!\n${winnermoney} were added to your account`)
        dbs.run(`UPDATE credits SET credits = credits+${winnermoney} WHERE userid = ?`, message.author.id)
        } else {
          if(botmoves[ran] == "paper") {
            message.channel.send(`Paper, better luck next time!\n${losermoney} credits were deduced from your account.`)
            dbs.run(`UPDATE credits SET credits = credits-${losermoney} WHERE userid = ?`, message.author.id)
            }
          }
      
        }
}
if(lm.credits < row.money) return message.channel.send("You don't have enough money to play, please change your bet.")
  if(move == "scissors") {
     if(botmoves[ran] == "scissors") {
message.channel.send(`scissors, its a Draw!\n${drawmoney} were re-added to your account.`)
    } else {
      if(botmoves[ran] == "paper") {
        message.channel.send(`Paper, you won!\n${winnermoney} were added to your account`)
        } else {
          if(botmoves[ran] == "rock") {
            message.channel.send(`Rock, better luck next time!\n${losermoney} credits were deduced from your account.`)
          }
        }
      }
    }
  })
})
    } else {
      message.channel.send("In order to start playing Rock, Paper and Scissors game, you must set your own game bet by using **>bet [amount]**")
    }
  })
}
module.exports.help = {
name: "rps"
}
