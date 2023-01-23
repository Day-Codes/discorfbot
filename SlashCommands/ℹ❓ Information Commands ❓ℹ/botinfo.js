const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const mongoose = require('mongoose');
let cpuStat = require("cpu-stat");
let os = require("os");
const Discord = require(`discord.js`);

module.exports = {
    name: "botinfo",
    category: "Info",
    description: "gathers the bot's information",
    type: "bot",
    run: async (client, interaction, args) => {

      const version = "1.02";

      embeds = [];
      let totalguilds;

      let date = new Date();
      let timestamp = date.getTime() - Math.floor(client.uptime);

      const data = await client.cluster.broadcastEval(c => { 
        let date = new Date();
      let timestamp = date.getTime() - Math.floor(c.uptime);
        return { guilds: c.guilds.cache.size, members: c.guilds.cache.map(g => g.memberCount).reduce((a,b)=>a+b,0), cluster: c.cluster.id, shards: c.cluster.ids.map(d => `#${d.id}`).join(", "), uptime: timestamp, ping: c.ws.ping, ram: (process.memoryUsage().heapUsed/1024/1024).toFixed(0) } })

      const shardField = data.map((d) => {
        const { cluster, shards, guilds, members, ping, uptime } = d;
        let ifGuild;

        if(cluster == client.cluster.id) {
          ifGuild = `\n> **__This Guild__**`
        } else {
          ifGuild = "\n> **__Not This Guild__**"
        }
        
        return {
          name: `\`Cluster #${cluster}\` (<t:${Math.floor(uptime / 1000)}:R>) ${ifGuild}`,
          value: `\`\`\`yml\nCluster: #${cluster}\nShards: ${shards}\nGuilds ${guilds}\nMembers: ${members}\nPing: ${Math.round(ping)}ms\n\`\`\``,
          inline: true,
        }
      })


        const embed = new MessageEmbed()
          .setAuthor(`Bot Information of: ${client.user.tag}`, client.user.displayAvatarURL())
          .addField(`⏳ Memory Usage`, `> \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
          .addField(`👾 Discord.js`, `> \`v${Discord.version}\``, true)
          .addField(`🤖 Node.js`, `> \`${process.version}\``, true)
          .addField(`🤖 CPU`, `> \`${os.cpus().map((i) => `${i.model}`)[0]}\``, true)
          .addField(`📡 Ram`, `> \`${(process.memoryUsage().heapUsed/1024/1024).toFixed(0)}\``, true)
          .addField(`🕒 Arch`, `> \`${os.arch()}\``, true)
          .addField(`**Developer __Information__**`, `\`\`\`yml\nDeveloper: Dayln#0001\nServer: https://discord.gg/Wee9zCbDXrL\nBot-Version: ${version}\n\`\`\``)
          .addFields(shardField)
          .setThumbnail(interaction.guild.iconURL())
      .setColor(`GREEN`)
          .setFooter(`${client.user.username}︲Coded by azury︲You're cluster: #${client.cluster.id} & shard: ${client.cluster.ids.map(d => `#${d.id}`).join(", ")}`, interaction.guild.iconURL())
          

      

      return interaction.followUp({ embeds: [embed] })
      
    },
};