const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const client = require("../main");

client.on("guildCreate", async(guild) => {
  const join = new MessageEmbed()
  .setTitle("Guild Joined | ^w^ ")
  .setDescription(`Guild: ${guild.name} - ${guild.id} \n --------- \n Stats: Members: ${guild.memberCount} \n Total Guilds: ${client.guilds.cache.size} \n ---------\n Owner:<@!${guild.ownerId}> owner id: (${guild.ownerId})\n*Note for Developer:* This stats are to be track of!`)
  .setColor("#00FF00")
  .setThumbnail(guild.iconURL())

client.guilds.cache.get("1015420985752698900").channels.cache.get("1021946513401843712").send({ embeds: [join] }) 
});

client.on("guildDelete", async(guild) => {
  const join = new MessageEmbed()
  .setTitle("Guild Left | :( ")
  .setDescription(`Guild: ${guild.name} - ${guild.id} \n --------- \n Stats: Members: ${guild.memberCount} \n Total Guilds: ${client.guilds.cache.size} \n *Note for Developer:* This stats are to be track of!`)
  .setColor("#FF0000")
  .setThumbnail(guild.iconURL())

  client.guilds.cache.get("1015420985752698900").channels.cache.get("1021946513401843712").send({ embeds: [join] }) 
});

client.on('guildCreate', (g) => {
  const embed = new MessageEmbed()
  .setTitle("Thanks for inviting the bot!")
  .setDescription("📢┆Alert! \n After more than 2 months we decided to publish this bot, for more information go to [this server](https://berkelium.cf/invite) \n \n ❓┆How to setup? \n The default prefix = \`/\` \nTo run commands with Bot run \`/help\` \n \n ☎️┆I need help what now? \n You can DM <@959215890321260545> for support or joining the [[Support server]](https://berkelium.cf/discord) \n \n 📨┆Invite the bot! \n Invite the bot to click [[HERE]](https://berkelium.cf/invite)")
  .setColor("#87CEEB")
  .setFooter("If the command not working please join our support server and ping the Dayln!")
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
				.setLabel('Invite')
				.setStyle('LINK'),
			);
 

    const channel = g.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(g.me).has('SEND_MESSAGES'))
    channel.send({  content: "Hello! I am here!", embeds: [embed], components: [row] })
})