const { MessageEmbed } = require('discord.js')
const client = require("../main");
const logs = require('discord-logs');
logs(client);

// Access to new events, like guildMemberBoost!
client.on('guildMemberBoost', (member) => {
    console.log(`${member.user.tag} just boosted ${member.guild.name}!`);
const embed = new MessageEmbed()
  .setTitle("New Boost!")
  .setDescription(`Yooo! ${member.user.tag} has just boosted our server! YAY! we got boosts`)
  .setFooter('We trying to get level 3 and keep it!')
  .setImage("https://tenor.com/view/boost-lzboyy-gif-25874166")
  .setColor("#3bbd4a")
  client.guilds.cache.get("1015420985752698900").channels.cache.get("1021946513401843712").send({ embeds: [embed] })
});
