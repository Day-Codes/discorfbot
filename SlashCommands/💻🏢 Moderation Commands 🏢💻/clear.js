const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'clear',
  description: 'Clear a message/messages',
  devOnly: true,
  options: [
    {
      name: 'amount',
      description: 'The amount of messages to be cleared',
      type: 'INTEGER',
      required: true,
    }
  ],
    run: async (client, interaction) => {
            const cl_amount = interaction.options.getInteger('amount') 
      if(cl_amount < 1){
        interaction.followUp({content: "You should add an amount not subtract an amount?"})
      }
      if(cl_amount > 100){
        interaction.followUp({content: "You can only delete 100 messages or less"})
      } else

         interaction.channel.bulkDelete(cl_amount);
    }
}