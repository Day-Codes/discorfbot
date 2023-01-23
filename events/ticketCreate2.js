const { MessageEmbed } = require("discord.js")
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions
} = require(`discord.js`);
const client = require("../main.js")
const discordTranscripts = require('discord-html-transcripts');
const colors = require("colors")
const db = require('quick.db')

client.on("interactionCreate", async (interaction) => {
const s = `2`;
  const role = db.get(`adminrole_${interaction.guild.id}${s}`);
  const cat = db.get(`category_${interaction.guild.id}${s}`) || null
  const logs = db.get(`ticketlogs_${interaction.guild.id}`) || null;
  const message = db.get(`ticketmsg_${interaction.guild.id}${s}`) || null;
      if (!interaction?.isButton()) return;
      const wait = require('util').promisify(setTimeout);

      if(interaction.customId == `create_ticket${s}`) {
        console.log("Ticket Creation - GUILD: "+interaction.guild.name+" | OPENER: "+interaction.user.tag+"".green.dim)
        if(!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.reply({ content: `:X: **I couldnt Create the ticket!**\n> *Make sure that i have the \`MANAGE_CHANNELS\` permission!*`, ephemeral: true })
        var nameer = `ticket-${interaction.user.username}`
                var checkTickets = interaction.guild.channels.cache.find(c => c.name == nameer.split(' ').join('-').toLocaleLowerCase());
                if (checkTickets) {
                   return interaction.reply({ content: `*You already have a ticket open! Close it first!**`, ephemeral: true})
                 } 
                
        interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    permissionOverwrites: [{
                            id: interaction.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: require('quick.db').fetch(`adminrole_${interaction.guild.id}${s}`),
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        }, {
                            id: interaction.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                    type: 'text',
                    parent: cat,
                    topic: `📨 Ticket for: ${interaction.user.tag} (${interaction.user.id})`
                }).then(async function(channel) {
                  db.set(`Ticketopener_${channel.id}`, interaction.user);
                  await interaction.reply({ content: `<a:Loading:920516789883002880> Creating your ticket (This could take a few seconds)...`, ephemeral: true })
                await wait(1000)
                await interaction.editReply({ content: ` **Created your ticket in ${channel}**`, ephemeral: true })
                  
        const embed = new MessageEmbed()
        .setAuthor(`Ticket for: ${interaction.user.tag}`, interaction.user.displayAvatarURL(), `NFG ticketing`)
        .setDescription(`${message || `**Thanks for opening a ticket, please tell us what you need!**`}`)
        .setThumbnail(interaction.guild.iconURL())
        .setFooter(`To close/manage this ticket react with the buttons\nYou can also type: /ticket-close`, interaction.guild.iconURL())
        const embed2 = new MessageEmbed()
        .setAuthor(`A staff member will claim this ticket soon!`, `https://cdn.discordapp.com/emojis/833101350623117342.gif?size=512`, `NFG ticketing`)
        .setDescription(`> *Please wait for one of the users with <@&${role}> to claim!*\n\n> **Once they do, they will assist you with your needs!**`)
        .setFooter(`Ticketing`, interaction.guild.iconURL())

        const buttons = new MessageActionRow()
        .addComponents([
          new MessageButton()
          .setStyle(`DANGER`)
          .setEmoji('❌')
          .setLabel(`Delete Ticket`)
          .setCustomId(`close_ticket${s}`),
          new MessageButton()
          .setStyle(`PRIMARY`)
          .setEmoji(`📝`)
          .setLabel(`Transcript Ticket`)
          .setCustomId(`transcript_ticket${s}`),
          new MessageButton()
          .setStyle(`SECONDARY`)
          .setEmoji('⚒')
          .setLabel(`Claim this ticket`)
          .setCustomId(`claim_ticket${s}`)
        ])


        channel.send({ content: `**${interaction.user}** | **<@&${role}>**`, embeds: [embed, embed2], components: [buttons] }).then(msg => {
              msg.pin();
                    })
                    });
                    } if(interaction.customId == `close_ticket${s}`) {
                    const norole = new MessageEmbed()
        .setColor(RED)
        .setTitle(`:X" You need the Admin Role to Manage this ticket!`)
        .setDescription(`***You need <@&${role}> to close this ticket!***`)
        .setFooter(`NFG ticketing`, interaction.guild.iconURL())
                      if(!interaction.member.roles.cache.has(role)) {
                        return interaction.reply({ embeds: [norole], ephemeral: true})
                      }
        const embed = new MessageEmbed()
        .setColor(client.config.color.purple)
        .setTitle(` Deleting the Ticket...`)
        .setDescription(`*The ticket will be deleted in about 5 seconds!*`)
        .setFooter(`NFG ticketing Action by ${interaction.user.username}`, interaction.guild.iconURL())

        interaction.reply({ embeds: [embed] })
        setTimeout(() => {
                    interaction.channel.delete();
                }, 1000 * 4.3);
                const log = new MessageEmbed()
                .setColor(client.config.color.orange)
                .setAuthor(`Ticket-Log for: ${interaction.channel.name}`, `https://cdn.discordapp.com/emojis/853259977031417906.png?size=512`, `NFG ticketing`)
                .setDescription(`Closed by: **\`${interaction.user.tag}\`**`)
                .setFooter(`The Transcript is attacthed to this message above!`, client.user.displayAvatarURL())
                const attachment = await discordTranscripts.createTranscript(interaction.channel);

                client.channels.cache.get(logs.id).send({ content: `<@`+interaction.user.id+`> **You Closed a ticket!**`, embeds: [log], files: [attachment]})
      } else if(interaction.customId == `transcript_ticket${s}`) {
        const attachment = await discordTranscripts.createTranscript(interaction.channel);
        

        interaction.reply({ content: `** ${interaction.user} Transcript of: \`${interaction.channel.name}\`**`, files: [attachment] })
      } else if (interaction.customId == `claim_ticket${s}`) {
        const claimed = db.get(`claimed_${interaction.channel.id}`);
        const user = db.get(`Ticketopener_${interaction.channel.id}`);
        
        const norole = new MessageEmbed()
        .setColor(client.config.color.red)
        .setTitle(`ou need the Admin Role to Manage this ticket!`)
        .setDescription(`***You need <@&${role}> to claim this ticket!***`)
        .setFooter(`NFG ticketing`, interaction.guild.iconURL())
        
        if(!interaction.member.roles.cache.has(role)) {
                        return interaction.reply({ embeds: [norole], ephemeral: true})
                      }
        if(claimed) return interaction.reply({ content: `*This ticket has already been claimed!**`, ephemeral: true})
        if(user.id == interaction.user.id) return interaction.reply({ content: `*You have the Admin-Role, But you cant claim your own ticket!**`, ephemeral: true})
        const embed = new MessageEmbed()
        .setAuthor(`${interaction.user.tag} Claimed this ticket!`, interaction.user.displayAvatarURL())
        .setColor(client.config.color.main)
        .setFooter(`NFG ticketing`, interaction.guild.iconURL())

        const embed2 = new MessageEmbed()
        .setColor(client.config.color.main)
        .setAuthor(`${interaction.user.tag} | Staff Member`, interaction.user.displayAvatarURL(), `NFG ticketing`)
        .setDescription(`> _**${interaction.user.username}** has claimed this ticket! They will help you._`)

        db.set(`claimed_${interaction.channel.id}`, "claimed")
        interaction.message.edit({ embeds: [interaction.message.embeds[0], embed2]})
        interaction.reply({ embeds: [embed] })
      }


})