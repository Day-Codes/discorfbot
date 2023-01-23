const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");

let token_price = 5000

module.exports = {
    name: "invest",
    description: "Invest coins to tokens",
    type: 'CHAT_INPUT',
    devOnly: true,
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Verifiying..`);

      let token_bank = await client.tokens(interaction.user.id)
      let coin_bank = await client.bank(interaction.user.id)

      if(coin_bank < token_price) return msg.edit(`Ay, you can't invest with ${coin_bank} coins. its not enough to invest.**`)

      client.rmvCoins(interaction.user.id, token_price)
      client.addTokens(interaction.user.id, 1)  

      let token_bank2 = await client.tokens(interaction.user.id)
      return msg.edit(`Well you did it, you have just invested **5k coins** into **1 token**, you now have **${token_bank2} tokens!**`)
    },
};
