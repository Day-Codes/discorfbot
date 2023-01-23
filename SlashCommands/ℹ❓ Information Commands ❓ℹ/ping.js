const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Get the ping of the bot",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      let msg = await interaction.followUp(`Pinging..`);

      setTimeout(() => {
        msg.edit(`${Math.round(client.ws.ping)}ms | RT: ${msg.createdTimestamp - interaction.createdTimestamp}`);
      }, 500);
    },
};
