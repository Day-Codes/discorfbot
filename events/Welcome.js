const client = require('../main') // Import the client (from the file where udefined client)
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')



client.on('guildMemberAdd', async (member) => {
    var channel = client.channels.cache.get('844305467639070798') // the channel where u wanna send the message

    channel.send({
        content: `<:join:1001325615389081650> <@${member.user.id}> welcome to **${member.guild.name}**! <@&934297716060733450>`,
        components: [
            new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel(`${member.guild.memberCount} members`)
                .setStyle('SECONDARY')
                .setCustomId(`1`)
                .setDisabled(true)
            )
        ]
    })
})



client.on('guildMemberRemove', async (member) => {
    var channel = client.channels.cache.get('844305467639070798') // the channel where u wanna send the message

    channel.send({
        content: `<:leave:1001325524662096022>  \`${member.user.tag}\` \`(${member.user.id})\` left **${member.guild.name}**!`,
        components: [
            new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel(`${member.guild.memberCount} members`)
                .setStyle('SECONDARY')
                .setCustomId(`2`)
                .setDisabled(true)
            )
        ]
    })
})




  
// Credits : Zayn#9478
