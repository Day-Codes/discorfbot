
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const hastebin = require('hastebin-gen');
const axios = require('axios')
module.exports = {
    name: "say",
   nodefer: false,
    category: ":beginner: Info",
    description: "ask a question",
    type: 'CHAT_INPUT',
    options: [
        {
          name: "say",
          description: "What you want to say.",
          type: "STRING",
          required: true,
        },
    ],
    run: async (client, interaction, args) => {
             const input = interaction.options.getString("say")
      let msg = await interaction.followUp( input )
 

  
    
 
    },     
};
/* ============================================== */
/* :star: Azury Manager • Private • Server Manager :star: */
/* Coded by discord.gg/azury Copyrighted @ Azury  */
/* ============================================== */