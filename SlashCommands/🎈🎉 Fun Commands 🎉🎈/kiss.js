const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require('axios')
const anime = require('anime-actions')
module.exports = {
    name: "kiss",
    description: "kiss User",
    type: 'CHAT_INPUT',
   options: [
    {
      name: 'member',
      description: 'Member that you want to to kiss',
      type: 'USER',
      required: true
    }
  ],
    run: async (client, interaction, args) => {
          const user = interaction.options.getMember('member');

      const kiss = await anime.kiss()
      let msg = await interaction.followUp(`Loading..`);

   const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`${interaction.member} Has Kissed ${user}`)
     .setImage(`${kiss}`)
      .setFooter(`<3`) 

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setURL(`https://www.npmjs.com/package/anime-actions`)
				.setLabel('Npm Package')
				.setStyle('LINK'),
			);

      
      setTimeout(() => {
        msg.edit({ embeds: [emb], components: [row] });
      }, 500);
    }
};