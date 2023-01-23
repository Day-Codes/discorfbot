const { Client, CommandInteraction } = require("discord.js");
const Discord = require(`discord.js`);
const db = require(`quick.db`);
const backup = require('discord-backup');

module.exports = {
    name: "autobackup",
    description: "Enable or Disable the Auto-backup module",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "option",
        description: "(Enable will make Backups every 30mins)",
        type: "STRING",
        required: true,
        choices: [
          { name: `Enable`, value: `enable` },
          { name: `Disable`, value: `disable` },
        ]
      },
      {
          name: "log_channel",
          description: "Logs for Auto-Backups (Only logs if Auto-backup is enabled)",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      },
    ],
    run: async (client, interaction, args) => {
      let option = interaction.options.getString('option');
      let msg = await interaction.followUp(`Fetching..`);
      let ch = interaction.options.getChannel(`log_channel`);
      
      if(!interaction.member.permissions.has("ADMINISTRATOR")) return msg.edit(`⚠ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
        
              
        if(option == 'disable'){
          db.delete(`autobackup_${interaction.guild.id}`)
        } else {
          db.set(`autobackup_${interaction.guild.id}`, "enabled")
          db.set(`backupch_${interaction.guild.id}`, ch.id)
        }
              
        
              
        console.log(`🔶 Auto-Backup ${option.toUpperCase()}D for ${interaction.guild.name}`.brightGreen.bold)
        if(option == 'enable') {
        msg.edit(`<:W_:988304599150624788> **__${option.toUpperCase()}D__ the Auto-Backup System!**\n\n**I'll Start creating Backups every 3 Hours! And they will be logged in ${ch}**`);
          const embed = new Discord.MessageEmbed()
          .setColor(`ORANGE`)
          .setTitle(`<:W_:988304599150624788> AUTO BACKUP EMBED <:W_:988304599150624788>`)
          .setDescription(`Alright now, it will bacup every 3 hours, so raids and nukes may not affect the server too much. `)
          const row = new Discord.MessageActionRow()
          .addComponents([
            new Discord.MessageButton()
            .setStyle(`DANGER`)
            .setLabel(`Create a Auto-Backup Now`)
            .setEmoji(`🛑`)
            .setCustomId(`autobackup_create_force`),
          ])
          ch.send({ embeds: [embed], components: [row] })
          backup.create(interaction.guild).then(async (backupData) => {
            ch.send({ content: `<:W_:988304599150624788> **Auto Backup Created:** \`${backupData.id}\`` })
            db.set(`backupid_auto_${interaction.id}`, backupData.id)
          })
                    
        } else {
          msg.edit(`<:W_:988304599150624788>**__${option.toUpperCase()}D__ the Auto-Backup System!**\n\n**I'll will NOT create Backups every 3 Hours!**`);
        }
            
    },
};
