const { DiscordTogether } = require('discord-together');
  const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require('axios')
module.exports = {
    name: "youtube-together",
    description: "youtube Together! | ",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
     
     if(interaction.member.voice.channel) {
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
                return interaction.followUp(`${invite.code}`);
            });
    
     }
    }
};
      
      

