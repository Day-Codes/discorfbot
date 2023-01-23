const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const backup = require('discord-backup');
const Discord = require(`discord.js`);
const wait = require('util').promisify(setTimeout);
module.exports = {
    name: "backupinfo",
    description: "Information of a Backup",
    type: 'CHAT_INPUT',
  options: [
      {
        name: "id",
        description: "Backup ID",
        type: "STRING",
        required: true,
      }
    ], 
    run: async (client, interaction, args) => {
      
      const id = interaction.options.getString(`id`);

        backup.fetch(id).then(async (backup) => {
          const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
      const msg = await interaction.followUp({ content: `<:azury_db:959241159673270272> **Backup Information of ID [\`${backup.id}\`]** :information_source: \n\n**Server Name: \`${backup.data.name}\`**\n**Backup size: \`${backup.size} kb\`**\n**Created at \`${formattedDate}\`**` })
        }).catch((err) => {

        if (err === 'No backup found')
            return interaction.followUp('<:no:897849877810274324> **No Backup Found for that ID!**');
        else
            return interaction.followUp('<:no:897849877810274324> **Someing occured wrong while Loading your backup, here is what it is:** '+(typeof err === 'string') ? err : JSON.stringify(err));

    });
   },
};