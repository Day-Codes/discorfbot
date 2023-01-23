const client = require("../main");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
client.on("messageCreate", async (message) => {


 if (message.channel.id !== "998426217155924039"|| message.author.bot) return;
 SendInChannel();

 function SendInChannel() {
  const channel = client.channels.cache.get("998426217155924039");
  if (!channel) return;
   const embed = new MessageEmbed()
   .setColor(`WHITE`)
   .setAuthor(`${message.author.username} • Leave of Absence`, message.author.displayAvatarURL())
   .setDescription(`> ***NOTE: Your LOA may not be accepted if the owners do not react with the correct sign in 24 hours, it means that its declined, for more info, contact the owners*** \n \n > **${message.content}**`)
   .setFooter(`USER-ID: `+message.author.id, message.guild.iconURL())
   message.delete()
   channel.send({ content: `:information_source: **LOA OF: ${message.author} / <@&${client.config.ownerRole}>**`, embeds: [embed] }).then((m) => { m.react("✅") });
   }
})
