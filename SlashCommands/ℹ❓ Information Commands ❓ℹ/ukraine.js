
  const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require('axios')
module.exports = {
    name: "ukraine",
    description: "get bot message! | ",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Loading..`);
          let ok = async () => {
  let wow = await axios.get('https://api.azury.live/dog');
  let ee = wow.data
  return ee
}
let eeValue = await ok();
      
      const emb = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`Memes!!!`)
      .setImage(`${eeValue.result}`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic : true }))
      .setFooter(`Made with 💖 by .gg/azury | apis.daylnapi.tk`) 

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setURL(`https://apis.daylnapi.tk`)
				.setLabel('API')
				.setStyle('LINK'),
			);
      
      setTimeout(() => {
        msg.edit({ content: `<:support:957780404759326730> Pendragon Memer Stands with Ukraine!` });
      }, 500);
    },
};
