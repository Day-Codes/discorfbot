const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const Discord = require(`discord.js`);
const backup = require('discord-backup');
const client = require(`../../main.js`);
const wait = require('util').promisify(setTimeout);
const db = require(`quick.db`)
module.exports = {
    name: "backup_create",
    description: "Create a Backup",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
      if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp(`⚠ You are missing the **"ADMINISRATOR"** permission, therefore you cannot run this command`)
      
      interaction.followUp({ content: `⚠️ **Ight man just wanna say this will make a whole save for this whole server, everything in this server will save, its not like anyone is gonna get access to it but i just wanna confirm just in case"`, components: [new Discord.MessageActionRow().addComponents([ new Discord.MessageButton().setLabel(`Continue`).setStyle(`DANGER`).setCustomId(`create_backup`) ])] })
      },
};
client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "create_backup") {
      interaction.update({ content: `<a:Loading:920516789883002880> **Now saving the Backup!**\nThis could take up to 2 Minutes (belongs to your data amount)`, components: []})
      await wait(1000)
      console.log(`(\\) Creating a Backup for ${interaction.guild.name}`.brightGreen.bold)
      backup.create(interaction.guild).then(async (backupData) => {
await wait(1000)
        console.log(`(/) Created a Backup for ${interaction.guild.name}`.brightGreen.bold)
        interaction.editReply({ content: `<:W_:988304599150624788> **Backup successfully created.**\n\n**To Load it type:**\n> \`/backupload id: ${backupData.id}\`\n\n**To view info about it, type:**\n> \`/backupinfo id: ${backupData.id}\``, components: []})
       let data = {
            id: backupData.id,
            author: interaction.user.tag,
        };
db.push(`backupids_${interaction.guild.id}`, data)
interaction.user.send({ content: `<:W_:988304599150624788> **Backup successfully created.**\n\n**To Load it type:**\n> \`/backupload id: ${backupData.id}\`\n\n**To view info about it, type:**\n> \`/backupinfo id: ${backupData.id}\``})
    }).catch((e) => {

         interaction.editReply({ content: '<:no:897849877810274324> **Something occured wrong when creating your Backup!**\n**Please make sure I am able to Manage Roles, Channels, Server-Icon, Banner, Categories, and Everything in the server!**', components: []});
        console.log(e)

    })
  }
})