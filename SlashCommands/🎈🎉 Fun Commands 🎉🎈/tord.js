const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require('axios')
const anime = require('anime-actions')
module.exports = {
    name: "truth-dare",
    description: "play truth or dare",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
    

      const kiss = await anime.yeet()
      let msg = await interaction.followUp(`Loading..`);

   const emb = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Truth or dare?`)
     .setDescription("Pick truth or dare via buttons")
      .setFooter(`EEE`) 

    const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('truth')
                    .setLabel('truth')
                    .setStyle('SUCCESS'),
            );
            
	   const ro = new MessageActionRow()
         .addComponents(
                new MessageButton()
                    .setCustomId('dare')
                    .setLabel('dare')
                    .setStyle('DANGER'),
            );
      
      setTimeout(() => {
        msg.edit({ embeds: [emb], components: [row, ro], content: "Read the embed to know how to play"
          });
      }, 500);
    }
};