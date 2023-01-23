const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require('axios')
module.exports = {
    name: "createinv",
    description: "create invite",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);
let invite = await interaction.channel.createInvite(
  {
    maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
    maxUses: 5 // maximum times it can be used
  },
  `Requested with command by ${interaction.author}`
)
.catch(console.log);

      
      setTimeout(() => {
        msg.edit({ content: `Here the invite: ${invite}`, ephemeral: true });
      }, 500);
    },
};


