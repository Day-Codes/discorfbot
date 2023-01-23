const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const ms = require('ms');
const util = require("./assets/utils")
require('dotenv')

module.exports = {
    name: "gw-delete",
    description: "Delete the giveaway",
    type: 'CHAT_INPUT',
    devOnly: true,
    options: [
      {
        name: "message_id",
        description: "The message id of the giveaway you want to end",
        type: "STRING",
        required: true,
      },
      {
        name: "reason",
        description: "The reason why you want to end the giveaway",
        type: "STRING",
        required: false,
      }
    ],
    run: async (client, interaction, args) => {
      const messageId = interaction.options.getString('message_id');
      const deleteReason = interaction.options.getString('reason') || "No reason"
      
if(!interaction.member.permissions.has("MANAGE_GUILD")) return msg.edit({ content:`**You don't have he permissions to delete a giveaway :(, go check your roles**`, ephemeral: true});
      
        
        client.giveawaysManager
          .delete(messageId)
          .then(() => {
                interaction.followUp('Success! Giveaway deleted!');
            })
      
    }

}