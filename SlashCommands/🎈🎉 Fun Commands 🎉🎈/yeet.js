const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require('axios')
const anime = require('anime-actions')
module.exports = {
    name: "yeet",
    description: "yeet User",
    type: 'CHAT_INPUT',
   options: [
    {
      name: 'member',
      description: 'Member that you want to to yeet',
      type: 'USER',
      required: true
    }
  ],
    run: async (client, interaction, args) => {
          const user = interaction.options.getMember('member');

      const kiss = await anime.yeet()
      let msg = await interaction.followUp(`Loading..`);

   const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`${interaction.member} Has Yeeted ${user}`)
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