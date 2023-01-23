const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const Discord = require('discord.js');
const globPromise = promisify(glob);
const colors = require("colors")

module.exports = async (client) => {
    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);
    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
      const file = require(value);
      if (!file?.name) return;
      client.slashCommands.set(file.name, file);
      arrayOfSlashCommands.push(file);
    }); 

    
    client.on("messageCreate", async (message, user) => {
      if(message.content.startsWith(`${client.config.prefix}deploy`)){
        try{
          
          
          let themsg = await message.reply(`**Attempting to set the GUILD Slash Commands in \`${message.guild.name}\`...**`)
          await client.application.commands.set(arrayOfSlashCommands).then((slashCommandsData) => {
            themsg.edit(`Loaded **${slashCommandsData.size}** slash commands to this guild`);
          }).catch((e) => {
            console.log(e)
            themsg.edit(`**I Could not load the Slash Commands for ${message.guild.name}**\n\n**I Must be missing permissions to Create Slash-Commands! Invite me when this link:**\n> https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
          })
        } catch(e) {
          console.log(String(e.stack))
          return message.channel.send({
            embeds: [new Discord.MessageEmbed()
              .setColor(`RED`)
              .setTitle(`❌ Something want wrong!`)
              .setDescription(`This error isn't supposed to happen! This must be a code error! Join discord.gg/Azury for help!`)
            ]
          })
        }
      }
    })
      

    client.on('guildCreate', async (guild) => {
   await client.application.commands.set(arrayOfSlashCommands);
   return console.log(`⚡ I was Invited to ${guild.name}! I will now start creating the Slash Commands (If i have perms)`)
    })

   /* mongoose.connect(process.env.mongooseConnectionString || client.config.mongooseConnectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(console.log(`🏆 Loading MONGO database`))*/

}


