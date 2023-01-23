const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
const client = require("../main");
const db = require(`quick.db`);
const backup = require('discord-backup');

client.on("interactionCreate", async (interaction) => {
  if(interaction.customId == "autobackup_create_force") {
    let owner = await interaction.guild.fetchOwner()
    if(owner.id !== interaction.user.id) return interaction.reply({ content: `<:no:897849877810274324> **You Must be the SERVER OWNER to use this Command!**\n( This is for Safety Reasons )`, ephemeral: true })
    
    const autobackup = db.get(`autobackup_${interaction.guild.id}`);
    if(!autobackup) return interaction.reply({ content: `<:no:897849877810274324> **Error: The Auto-Backup System Hasn't been setup yet for this Guild? Please try again!**`, ephemeral: true })
    
    console.log(`(\\) Creating Auto-Backup for ${interaction.guild.name}`.brightGreen.bold)
    const msg = await interaction.reply({ content: `<a:Loading:920516789883002880> **Force Creating your Auto-Backup...**`, ephemeral: true })
    backup.create(interaction.guild).then(async (backupData) => {
      const bkID = db.get(`backupid_auto_${interaction.id}`);
     
      interaction.channel.bulkDelete(1, true);
      interaction.channel.send(`<:Like:922852837636055051> **Auto Backup Created:** \`${backupData.id}\``)
      
      if(bkID) await backup.remove(bkID);
      db.set(`backupid_auto_${interaction.guild.id}`, backupData.id)
      interaction.editReply({ content: `<a:yes_animated:911729650030510081> **Created Your Auto-backup, the ID is shown Below!**`, ephemeral: true })
    })
    console.log(`(/) Created a Auto-Backup for ${interaction.guild.name}`.brightBlue.bold)
  }
})