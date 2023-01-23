
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const hastebin = require('hastebin-gen');
const axios = require('axios')
module.exports = {
    name: "gayrate",
   nodefer: false,
    category: ":beginner: Info",
    description: "gay rate.",
    type: 'CHAT_INPUT',

    
    run: async (client, interaction, args) => {
      const ask = interaction.options.getString('question')
      let msg = await interaction.followUp(`**Loading Gay Rate**`)


      const rating = Math.floor(Math.random() * 100) + 1
          setTimeout(() => {
        msg.edit({ content:    `This user is: ${rating}` });
      }, 500);
    },     
};
/* ============================================== */
/* :star: Azury Manager • Private • Server Manager :star: */
/* Coded by discord.gg/azury Copyrighted @ Azury  */
/* ============================================== */