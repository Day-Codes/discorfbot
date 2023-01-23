const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const db = require(`quick.db`)

module.exports = {
    name: "ticket-setup",
    description: "Setup the ticket-system",
    options: [
    {
        name: "system",
        description: "Select which Ticket-System you want to setup",
        type: "STRING",
        required: true,
        choices: [
          { name: `1st Ticket-System`, value: `1` },
          { name: `2nd Ticket-System`, value: `2` },
          { name: `3rd Ticket-System`, value: `3` },
          { name: `4th Ticket-System`, value: `4` },
          { name: `5th Ticket-System`, value: `5` },
        ]
      },
      {
          name: "channel",
          description: "ticket-panel channel",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      },
      {
          name: "category",
          description: "ticket category",
          type: "CHANNEL",
          channelTypes: ["GUILD_CATEGORY"],
          required: true,
      },
      {
            name: "role",
            description: "Admin Role to manage tickets",
            type: 8,
            required: true,
      },
      {
        name: "button_label",
        description: "Label for the button",
        type: "STRING",
        required: true,
      },
      {
        name: "embed_desc",
        description: "Message on prompt",
        type: "STRING",
        required: true,
      },
      {
        name: "ticket_open_msg",
        description: "Message on ticket-open [Use +n+ to add a space]",
        type: "STRING",
        required: true,
      }
    ], 
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      let s = interaction.options.getString('system');
      let channel = interaction.options.getChannel("channel");
      let category = interaction.options.getChannel("category");
      let role = interaction.options.getRole('role');
      let message = interaction.options.getString('embed_desc');
      let msg = interaction.options.getString('ticket_open_msg');
      let label = interaction.options.getString('button_label');
      let check = await interaction.guild.channels.cache.get(channel.id);

      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp({ content: `:x: **You cannot use this Command to Manage the Ticket-System!**`, ephemeral: true})

      if(!check) return interaction.followUp({ content: `:x: The args you provide either isn't a channel, or I can't view the selected channel.` })

      const panel = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`📨 Open a Ticket`)
      .setDescription(`${message || `Open a ticket for ${interaction.guild.name}`}`)
      .setFooter(`Ticketing powered by Azury.live`, interaction.guild.iconURL())

      const button = new MessageActionRow()
      .addComponents([
        new MessageButton()
        .setLabel(label)
        .setStyle(`PRIMARY`)
        .setEmoji(`📨`)
        .setCustomId(`create_ticket${s}`)
      ])
      const embed = new MessageEmbed()
      .setColor(client.config.color.main)
      .setTitle(`:W_: Setup the Ticket System`)
      .addField(`:1234: System:`, `**${s}.**`)
      .addField(`<:Channel:934536160087244950> Ticket Channel:`, `**${channel.name} (${channel.id})**`)
      .addField(`<:Channel:934536160087244950> Ticket Category:`, `**${category || `_\` None Set, Using Defeult \`_`}**`)
      .addField(`:hammer:  Admin Role:`, `**${role} (${role.id})**`)
      .addField(`:information_source: Ticket Message (On Open)`, msg.split("+n+").join("\n"))
      
      db.set(`ticketmsg_${interaction.guild.id}${s}`, msg.split("+n+").join("\n"));
      db.set(`category_${interaction.guild.id}${s}`, category.id)
      db.set(`adminrole_${interaction.guild.id}${s}`, role.id);
      interaction.followUp({ embeds: [embed] })

      client.channels.cache.get(channel.id).send({ embeds: [panel], components: [button] })
    },
};