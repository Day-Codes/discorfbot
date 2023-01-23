const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

let v = 210 // ⚡ MAX AMOUNT OF COINS A USER CAN GET

module.exports = {
    name: "daily",
    description: "Get grinding for coins",
    type: 'CHAT_INPUT',
    cooldown: 3600000 * 24, // 24h
    run: async (client, interaction, args) => {
      if(interaction.member.roles.cache.some(z => z.id == client.boosterId)) v = 310

      let x = Math.floor(Math.random() * v) + 1
      interaction.followUp({ content: `**I admire your grind, heres your income for the day. You just gained a extra ${x} NFG coins!** \n _• Rember to grind again tmrw_` })
      client.addCoins(interaction.user.id, x)   
    },
};
