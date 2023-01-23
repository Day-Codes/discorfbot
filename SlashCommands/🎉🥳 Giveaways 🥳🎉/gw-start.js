const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const ms = require('ms');
const util = require("./assets/utils")
require('dotenv')

module.exports = {
    name: "gw-start",
    description: "Start a giveaway within your guild!",
    type: 'CHAT_INPUT',
    devOnly: true,
    options: [
      {
        name: "channel",
        description: "Select a channel you want to send the giveaway embed in",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
        required: true,
      },
      {
        name: "duration",
        description: "State how long the giveaway should last for [2s, 5m, 1h, 2d]",
        type: "STRING",
        required: true,
      },
      {
        name: "winners",
        description: "State how many members can win this giveaway",
        type: "INTEGER",
        required: true,
      },
      {
        name: "prize",
        description: "State the prize of the giveaway",
        type: "STRING",
        required: true,
      }
    ],
    run: async (client, interaction, args) => {
      const gw_ch = interaction.options.getChannel('channel')
      const gw_tm = interaction.options.getString('duration')
      const gw_nu = interaction.options.getInteger('winners')
      const gw_pz = interaction.options.getString('prize')
      let msg = await interaction.followUp(`Fetching..`)
      
        if(!interaction.member.permissions.has("MANAGE_GUILD")) return msg.edit({ content:`**You don't have he permissions to make a giveaway :(, go check your roles**`, ephemeral: true});

      const milliseconds = ms(gw_tm);
      if(isNaN(milliseconds)) return msg.edit(`🤔 Invalid time input, the time must be formatted end in \`s\`,\`m\`,\`h\` or \`d\``)

      if(gw_pz.length > 256) return msg.edit(`🤔 Uh oh, the giveaway prize must be less than 256 characters!`)
          
      if(gw_nu < 1 ) return msg.edit(`🤔 Hmm, the winner amount must be higher than 1!`)
      if(gw_nu > 15 ) return msg.edit(`🤔 Hmm, the winner amount must be lower then 15!`)
      
      client.giveawaysManager.start(gw_ch, {
        hostedBy: interaction.user,
        prize: `🎉 A giveaway is being hosted for, **${gw_pz}`,
        duration: milliseconds,
        winnerCount: parseInt(gw_nu),
        util,
        embedFooter: `Possible winners, ${gw_nu}`,
      });
      return msg.edit(`🎉 I have successfully posted your giveaway [${gw_ch}] for **${gw_pz}**!`)
    },
};