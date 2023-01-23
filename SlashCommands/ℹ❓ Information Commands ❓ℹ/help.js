const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "See all of the bots commands",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
     
      let categories = [];
      let cmdDescription = ""

      readdirSync("./SlashCommands/").forEach((dir) => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../SlashCommands/${dir}/${command}`);
          if (!file.name) return "Missing file name.";
          let name = file.name.replace(".js", "");
          return `\`${name}\``;
        });
        let data = new Object();
        

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "Not FINISHED YET!" : cmds.join(" "),
        };

        categories.push(data);
      }); 

      const embed = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
      .setColor("RANDOM")
	.setImage("https://media.discordapp.net/attachments/973327104705957918/1006131252253958234/Azury.png?width=808&height=404")
      .setDescription(`Here are all the commands in one list, it goes from fun commands to info commands`)
      .addFields(categories)
      .setFooter(`Owned by: Dayln`) 

  	const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Admin',
							description: "Admin Commands",
							value: 'one',
						},
						{
							label: 'Nfsw',
							description: 'Nfsw',
							value: 'two',
						},
					]),
			);
      
      
        return interaction.followUp({ embeds: [embed] })
      

      
      
    },
};
