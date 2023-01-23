const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const {Pagination} = require("discordjs-button-embed-pagination");
require("mongoose");
const model = require("../../models/inv")
const model2 = require("../../models/prd")

module.exports = {
    name: "use",
    description: "Use/redeem a item from the store, which you own",
    type: 'CHAT_INPUT',
    devOnly: true,
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Fetching..`)
      
      let array = []
      model2.find({}, async(err, data) => {
        let data2 = data;
        if(data.length === 0) return msg.edit(`Hmmm, your inventory seems to be empty therefore you cannot use anything!`)

        

        let array = []
        data.map((v, i) => {
          x = {label:v.Name, description:v.Description,value:v.Name}
          array.push(x)
        })
      })

        const row = new MessageActionRow()
			  .addComponents(
			  	new MessageSelectMenu()
			  	.setCustomId('azu_redeem')
			  	.setPlaceholder('...')
			  	.addOptions([array]),
			  );

        const emb = new MessageEmbed()
        .setAuthor({ name: `NFG Inventory`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`Below in the selection is all the items in your inventory you can use, select one to get started** \n\n • _To view new items use /store, order one of them today using /order!_`)
        .setColor('#2f3136')
        .setFooter(`NFG economy`) 

        msg.edit({ content: ` `, embeds: [emb], components: [row] });
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
         
          model.findOne({ Name: i.values }, async(err, data) => {
            if(!data) return msg.edit({ content: `🚩 Uh oh, we cant seem to find that item at this moment! We recommend you try again as this could be outdated, if this error continues contact a developer!`, embeds: [], components: [] })
          })
          
 const ch = (data.inventory).includes(i.values)
          ch.delete() // note 4 hace: check mgndb later
          if(i.Type == 'token_product'){
            let dvc = moment(new Date()).format("")
            interaction.channels.cache.create(`🪙•${interaction.user.username}`, {
              topic: `🪙 ${interaction.user.tag} has redeem a token product! \n 🪐 ${dvc}`,
              parent: client.orderCateory,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: ['VIEW_CHANNEL']
                },
                {
                  id: interaction.user.id,
                  allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                },
                {
                  id: client.config.orderStaff,
                  allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'MANAGE_MESSAGES']
                },
              ]
            }).then(async(ch) => {
              
            })
          } else {
            // I'l work on making a add role system but its pointless since this coins for for getting gamepass and shit
          }
        
      })
    }
};
