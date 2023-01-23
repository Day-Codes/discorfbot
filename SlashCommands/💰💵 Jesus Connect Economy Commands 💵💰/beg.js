const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

let v = 25 // ⚡ MAX AMOUNT OF COINS A USER CAN GET

module.exports = {
    name: "beg",
    description: "Are you poor, beg for money",
    type: 'CHAT_INPUT',
    cooldown: 3600000 * 3, // 3h
    devOnly: true,
    run: async (client, interaction, args) => {
      if(interaction.member.roles.cache.some(z => z.id == client.boosterId)) v = 86

      let beg_success = Math.floor(Math.random() * 2) + 1
      let beg_amount = Math.floor(Math.random() * v) + 1

      if(beg_success == 1){
        beg_success = "Some nice person admired your persistance. You earned some cash GG"

        interaction.followUp({ content: `**${beg_success} ${beg_amount}!** \n _• Hey don't beg too much, try doing something else or wait 3 hours untill begging again_` })
        client.addCoins(interaction.user.id, beg_amount)
      } else {
        beg_success = "Someone came and laughed :skull: :skull: at you for begging, maybe you arent at the right place at the right time" 

        interaction.followUp({ content: `**${beg_success}!** \n _• You can beg again around 3 hours just to make sure you wont be greedy_` })
      }
    }
};
