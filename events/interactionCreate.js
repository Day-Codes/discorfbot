const client = require("../main");
const { MessageEmbed, Collection } = require("discord.js")
const cooldowns = new Map();

const adminRole = client.config.adminRole;

client.on("interactionCreate", async (interaction) => {

    // Slash Command Handling
    if (interaction.isCommand()) {
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd) return interaction.followUp({ content: "An error has occured!! Please Retry if not working join our support server! https://discord.gg/2tRW7Uq4Us" });

        if(cmd.devOnly == true && !client.config.developers.includes(interaction.user.id)) return interaction.reply({ content: "🚩 Uh oh, this command is locked to our developers only!", ephemeral: true })
       if(cmd.finishedCommand == false && !client.config.developers.includes(interaction.user.id)){
        return interaction.reply(`<a:deny:983374765890887690> **Hey there, this command is not finished or useable for the public, if this is a mistake please contact Support* \n * Invite url is https://discord.gg/2tRW7Uq4Us *`)
      }

      if(cmd.adminOnly == true && !interaction.member.roles.cache.has(adminRole)){
        if(client.config.developers.includes(interaction.user.id)){
          // if it doesn't do anything it continues the script
        } else
          interaction.reply({content: "Admins can only access ADMIN COMMANDS", ephemeral: true}) }
         

      function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + "h, " + minutes + "m, " + seconds + "s";
      }

       if (cmd.cooldown) {
        if (!cooldowns.has(cmd.name)) {
          cooldowns.set(cmd.name, new Collection());
        }
        let currentDate = Date.now();
        let userCooldowns = cooldowns.get(cmd.name);
        let cooldownAmount = (cmd.cooldown || 3) * 1000;
        if (userCooldowns.has(interaction.user.id)) {
          let expirationDate = userCooldowns.get(interaction.user.id) + cooldownAmount;
          if (currentDate < expirationDate) {
            let timeLeft = Math.round((expirationDate - currentDate) / 1000);
            return interaction.reply({ content: `⌚ Your on a cooldown! Wait **${msToTime(timeLeft.toString())}** before using this command again!` })
          } else {
            userCooldowns.set(interaction.user.id, currentDate);
          }
        } else {
          userCooldowns.set(interaction.user.id, currentDate);
        }
      }

      await interaction.deferReply({ ephemeral: false }).catch(() => {});
      const args = [];

      for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }
      interaction.member = interaction.guild.members.cache.get(interaction.user.id);
      cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
})