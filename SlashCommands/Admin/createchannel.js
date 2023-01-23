const { Client, CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "createchannel",
    description: "creates a new channel",
    type: 'CHAT_INPUT',
    options: [
      {
        name: 'name',
        description: 'Name of the channel',
        type: 'STRING',
        required: true,
    }],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Array} embeds
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
     let name = interaction.options.getString('name')

     if(!interaction.member.permissions.has("MANAGE_CHANNELS")){
       return interaction.followUp("You don't have permission to do that!")
     } else {
      interaction.guild.channels.create(`${name}`, {
        type: `GUILD_TEXT`
       }).then((c) => {
          c.send({ content: `${interaction.user} Created this channel!`})
         })
     }
}
}