const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
    const fetch = require('node-fetch');
      const ms = require('ms');

module.exports = {
    name: "mute",
    description: "mute a user",
    type: 'CHAT_INPUT',
  options: [
       {
          name: "user",
          description: "The user you want to timeout",
          type: "USER",
          required: true,
      },
     {
          name: "time",
          description: "Its must between **10 seconds** (10s) and **28 days** (28d).",
          type: "STRING",
          required: true,
      }, 
           ],
    run: async (client, interaction, args) => {
  

      if (!interaction.member.permissions.has('TIMEOUT_MEMBERS')) {

        interaction.delete()
      
      } else {
      
        const user = interaction.options.getUser(`user`);;
        

        const embed1 = new MessageEmbed()
          .setDescription("Please provide the user.")
          .setColor("RED");
      
        const embed2 = new MessageEmbed()
          .setDescription("Please specify the time.")
          .setColor("RED");

        const embed3 = new MessageEmbed()
          .setDescription("Please specify the time between **10 seconds** (10s) and **28 days** (28d).")
          .setColor("RED");

        if(!user) return interaction.reply({ embeds: [embed1] });

        const time = interaction.options.getString(`time`);;

        if(!time) return interaction.reply({ embeds: [embed2] });

        const milliseconds = ms(time);

        if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) return interaction.followUp({ embeds: [embed3] });

        const iosTime = new Date(Date.now() + milliseconds).toISOString();

            await fetch(`https://discord.com/api/guilds/${interaction.guild.id}/members/${user.id}`, {
                method: 'PATCH',
              body: JSON.stringify({ communication_disabled_until: iosTime }),
              headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${client.token}`,
                },
            });

        const embed4 = new MessageEmbed()
          .setDescription(`${user} has been **Timeout.** | \`${user.id}\``)
          .setColor("YELLOW");

        interaction.followUp({ embeds: [embed4] })

      }
    }
}

