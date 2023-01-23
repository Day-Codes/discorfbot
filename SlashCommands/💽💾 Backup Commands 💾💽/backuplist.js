const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const backup = require('discord-backup');
const Discord = require(`discord.js`);
const wait = require('util').promisify(setTimeout);
const db = require(`quick.db`);
module.exports = {
    name: "listbackups",
    description: "List backups of the Server",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      
      const bkID = db.fetch(`backupids_${interaction.guild.id}`);
      if(!bkID) return interaction.followUp(`<:no:897849877810274324>**There arent any Made Backups for this Server! (This Doesnt Include Auto-backups)**`)
      const msg = await interaction.followUp(`<a:Loading:920516789883002880> **Loading the Backups of \`${interaction.guild.name}\`**`)
      await wait(1000)
      if (bkID && bkID.length) {
            let array = [];
            bkID.forEach((m) => {
                array.push(`> **ID:** \`${m.id}\`\n> **AUTHOR:** \`${m.author}\``);
            });
        await wait(1000)
        await wait(1000)
        msg.edit({ content: `<a:yes_animated:911729650030510081> \`${bkID.length}\` **Backups of \`${interaction.guild.name}\`**\n\n${array.join('\n\n`========================`\n\n')}` })
      }
      
 
   } 
}