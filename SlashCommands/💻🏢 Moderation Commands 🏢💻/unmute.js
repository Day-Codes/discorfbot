const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
    const fetch = require('node-fetch');
      const ms = require('ms');

module.exports = {
    name: "unmute",
    description: "unmute a user",
    type: 'CHAT_INPUT',
  options: [
       {
          name: "user",
          description: "The user you want to ban",
          type: "USER",
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

        if(!user) return interaction.reply({ embeds: [embed1] });


        

        const iosTime = new Date(Date.now()).toISOString();

            await fetch(`https://discord.com/api/guilds/${interaction.guild.id}/members/${user.id}`, {
                method: 'PATCH',
              body: JSON.stringify({ communication_disabled_until: iosTime }),
              headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${client.token}`,
                },
            });

        const embed4 = new MessageEmbed()
          .setDescription(`${user} has been **untimeout.** | \`${user.id}\``)
          .setColor("YELLOW");

        interaction.followUp({ embeds: [embed4] })

      }
    }
}

