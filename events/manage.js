const client = require("../main.js")
client.on("interactionCreate", async (btn) => {
  if (btn.values == "stop_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "❌ You are not an developer of this bot, if you are a dev but you have made a new discord account which your userid hasn't listed then please contact one of the devs or if you still have access to your replit account, add it to yourself",
      ephemeral: true
    })
    try {
      btn.reply({
        content: "<a:Loading:920516789883002880> **Shutting the bot...** Please go to the repl and restart it",
        ephemeral: true
      })
      setTimeout(() => {
        process.exit()
      }, 5000)
    } catch (e) {
      btn.editReply({
        content: `${e}`
      })
    }
  }
  if (btn.values == "rename_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "❌ You can't use this!",
      ephemeral: true
    })
    let filter = (m) => m.author.id === btn.user.id;
    const collector = btn.channel.createMessageCollector({
      filter,
      max: 1
    })
    btn.reply({ content: "<a:Loading:920516789883002880> **Send new Bot Name**",
        ephemeral: true})
    /* collector.on("collect", async(msg) => {
      
    }) */ //not needed
    collector.on("end", (collected) => {
      const name = collected.first().content;
      if (!name) {
        return btn.reditReply({ content: `❌ **No Name!**`})
      }
      let beforename = client.user.username;
      client.user.setUsername(name)
        .then((user) => {
          message.delete()
          btn.editReply({ content: `✅ **Succesfully set name to ${client.user.username} from ${beforename}**`,
        ephemeral: true})
        })
        .catch((e) => {
          btn.editReply({ content: `${e}`,
        ephemeral: true})
        })
    })
  }
  if (btn.values == "changeav_client") {
    if(!client.config.developers.includes(btn.member.id)) return btn.reply({
      content: "❌ You can't use this!",
      ephemeral: true
    })
    let filter = (m) => m.author.id === btn.user.id;
    const collector = btn.channel.createMessageCollector({
      filter,
      max: 1
    })
    btn.reply({ content: "<a:Loading:920516789883002880> **Send the New Bot Image**",
        ephemeral: true})
    collector.on("collect", async (msg) => {
        let url = msg.content;
      if(msg.content.includes(`https://`)) {
        btn.editReply({ content: "<a:Loading:920516789883002880> **Changing avatar...**",
        ephemeral: true})
        
        await msg.delete()
        client.user.setAvatar(url)
          .then(user => {
            
              btn.editReply({ content: "✅ **Succesfully changed the Bot's avatar!**",
        ephemeral: true})
            
          }).catch((e) => {
          btn.editReply({ content: `${e}`,
        ephemeral: true})
        })
      } else {
        msg.delete()
        btn.editReply({ content: "❌ Not a valid URL",
        ephemeral: true})
      }
    })
  }
})