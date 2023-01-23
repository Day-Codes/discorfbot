const { Client, CommandInteraction } = require("discord.js");
const Discord = require(`discord.js`)
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");
module.exports = {
    name: "deploy",
    description: "Register the commands or make it register a new command",
    type: 'CHAT_INPUT',
    devOnly: true,
    
    run: async (client, interaction, args) => {
     
        const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);
    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
      const file = require(value);
      if (!file?.name) return;
      client.slashCommands.set(file.name, file);
      arrayOfSlashCommands.push(file);
    }); 

      let msg = await interaction.followUp({content: "Getting ready to deploy some commands"})
      
    
          
           msg.edit({ content: "**Attempting to set the GUILD Slash Commands in \`${interaction.guild.name}\`...**", ephemeral: true })
          await client.application.commands.set(arrayOfSlashCommands).then((slashCommandsData) => {
            msg.edit({content: `Loaded **${slashCommandsData.size}** slash commands to this guild`, ephemeral: true});
            console.log(blue(`[💻| Deploy Info] ${interaction.user.tag} has requested to deploy ${slashCommandsData.size} commands and the function had been successful`))
          }).catch((e) => {
            console.log(e)
               console.log(blue(`[💻| Deploy Info] ${interaction.user.tag} has requested to deploy commands but it did not work :( developers check the the error, The error >>> \n \n ${e}`))
            msg.edit({content: `**I Could not load the Slash Commands for ${interaction.guild.name}**\n\n**I Must be missing permissions to Create Slash-Commands! Invite me when this link:**\n> https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`, ephemeral: true})
          })
        }
      }
    