const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
  name: 'love',
   nodefer: false,
    
  description: "love command",
  type: 'CHAT_INPUT',
  options: [
    {
      name: `userone`,
      description: `Pick the 1st user`,
      type: "USER",
      required: true,
    },
   {
      name: `usertwo`,
      description: `Pick user 2`,
      type: "USER",
      required: true,
    },
  ],
  /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
       // Get members
        let firstUser = interaction.options.get('firstuser');
        let secondUser = interaction.options.get('seconduser');

        if (!firstUser.value || !secondUser.value) return interaction.reply({ content: 'There was an error, maybe you put invalid user?', ephemeral: true });

        let description = '';
        let heart = '';

        const love = Math.floor((Math.random() * 101)); // Generate a random number between 0 and 100

        switch (true) {
            case (love === 0):
                description = 'Not a chance';
                heart = '💔';
                break;
            case (love < 50):
                description = 'It\'s low, but don\'t give up';
                heart = '💔';
                break;
            case (love === 50):
                description = 'It\'s a fifty fifty';
                heart = '💗'
                break;
            case (love > 50):
                description = 'You have your chance';
                heart = '💗'
                break;
            case (love === 100):
                description = 'Get married!';
                heart = '💗'
                break;
        }

        const embed = new MessageEmbed()
            .setColor(interaction.member ? interaction.member.displayHexColor : 'RANDOM')
            .setDescription(`**<@${firstUser.value}> + <@${secondUser.value}>** = __${Math.floor(love)}%__ of Love ${heart}\n${description}`);

        await interaction.reply({ embeds: [embed] });
    },
};