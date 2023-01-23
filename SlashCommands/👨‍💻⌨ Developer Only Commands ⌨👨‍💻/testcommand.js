const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
    name: "testcommand",
    description: "For developer purposes",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {

        await interaction.followUp({content: "Test completed"})
    }
}