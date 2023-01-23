const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const backup = require('discord-backup');
const Discord = require(`discord.js`);
const client = require(`../../main.js`);
const wait = require('util').promisify(setTimeout);
let id = [];
module.exports = {
    name: "backupload",
    description: "Load a Backup",
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
      
       id = interaction.options.getString(`id`);
      
      backup.fetch(id).then(async () => {
      }).catch((err) => {

        if (err === 'No backup found')
            return interaction.followUp('<:no:897849877810274324> **No Backup Found for that ID!**');
        else
            return interaction.followUp('<:no:897849877810274324> **Someing occured wrong while Loading your backup, here is what it is:** '+(typeof err === 'string') ? err : JSON.stringify(err));

    })
      backup.fetch(id).then(async () => {
      let owner = await interaction.guild.fetchOwner();
      
      if(owner.id !== interaction.user.id) return interaction.followUp(`<:no:897849877810274324> **You Must be the SERVER OWNER to use this Command!**\n( This is for Safety Reasons )`)
        const msg = await interaction.followUp({ content: `⚠️ **THIS WILL REMOVE ALL ROLES, CHANNELS, EMOJIS, ECT.** ⚠️\n\n> Are you sure you wish to __load__ this backup? If so, press "confirm"`, components: [new Discord.MessageActionRow().addComponents([ new Discord.MessageButton().setLabel(`Confirm`).setStyle(`DANGER`).setCustomId(`load_backup`) ])] }).then(msg => {
            //Create the collector
            const collector = msg.createMessageComponentCollector({ 
                filter: (i) => (i.isButton() || i.isSelectMenu()) && i.user == interaction.user.id, 
                time: 90000
            })
            //Menu Collections
            collector.on('collect', interaction => {
                    collector.stop();
              interaction.reply({ content: `<a:yes_animated:911729650030510081> **Loading the Backup...**\n**This may take up to 5 Minuets depending on Your Server-Size!**`, components: []})
                    backup.load(id, interaction.guild, {clearGuildBeforeRestore: true, maxMessagesPerChannel: 10}).then(async (backupData) => {
                      console.log(`(\) Loaded a Backup from ${backupData.data.name} to ${interaction.guild.name}`.brightGreen.bold)
         
         interaction.user.send({ content: '<a:yes_animated:911729650030510081> **Backup has been loaded!**\n*All Server Names, Roles, Emojis, Channels, ect. Should be Loaded in!**' });

      })
                
            })
      })
   })
}
}
