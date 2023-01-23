const { MessageEmbed } = require('discord.js')
const client = require("../main");

client.on('messageCreate', async(message) => {

  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`){
   const embed = new MessageEmbed()
    .setTitle("Oh? A ping!")
    .setColor("#0B0B45")
    .setDescription(`Heya! ${message.author.username} ! :wave: you might be wondering why i made not be working with some commands! if so please join our support server! [Discord Server](https://berkelium.cf/discord) ! Please invite our bot to your server! [Bot invite](https://berkelium.cf/invite)`)
    .setFooter("Made by: Dg Code and Business, All Right owned 2022 by: Dg Capital")

return message.channel.send(`Heya! ${message.author.username} ! :wave: I see that you have mention me! my prefix is: **"/"** !! If you want to invite me to your guild please use our invite command! `)
  }
})