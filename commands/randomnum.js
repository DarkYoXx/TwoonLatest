const Discord = require("discord.js")
module.exports.run = async(bot, message, args) => {
    let first = Math.round(args[0])
 
    if(isNaN(first)) return message.channel.send("Only numbers are allowed.")
    if(first > 100000) return message.channel.send(`Sorry, this command's limit is **100,000**.`)
    if(first <= 10) return message.channel.send("Your limit can't be less than ten.")
    let random = Math.floor(Math.random() * first)
    message.channel.send(`Please wait a few moments while a random number is generated...`).then(m => {
        setTimeout(function(){
        m.edit(`Your random number is : **${random}**`)
        if(random == 69) return message.channel.send(":wink:")
        }, 2000)
    })
}
module.exports.help = {
    name: "rannum"
}