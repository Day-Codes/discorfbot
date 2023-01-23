const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave-guild",
    description: "leave's the selected server",
    type: 'CHAT_INPUT',
    ephemeral: true,
    UserPerms: [],
    BotPerms: [],
    OwnerOnly: true,
    options: [
        {
            name: "guildid",
            description: "The guild id to leave",
            type: "STRING",
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
            if(!client.config.owner.includes(interaction.user.id)) return msg.edit(`🔒 This command is locked to owners only!`)
        const guildid = interaction.options.getString('guildid')

        try {

            let guild = client.guilds.cache.get(guildid)

           await guild.leave().then((g) => {
                interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`Left ${g.name}`)
                            .setColor(embedconfig.color)
                            .addField(`--> Guild ID :`, `-> ${g.id}`)
                            .addField(`--> Guild Members :`, `-> ${g.memberCount}`)
                            .addField(`--> Guild Owner ID :`, `-> ${g.ownerId}`)
                            .setThumbnail(g.iconURL())
                    ]
                })
            })

        } catch (err) {
            interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setTitle(`:x: Error occured!`)
                    .setDescription(`Bot does not exists in that guild `)
                ]
            })
        }


    },
};