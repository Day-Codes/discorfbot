const client = require("../main");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
client.on("messageCreate", async (message) => {
  if (message.channel.id !== "998435830358089739"|| message.author.bot) return;
  SendInChannel();

  function SendInChannel() {
    const channel = client.channels.cache.get("998435830358089739");
    if (!channel) return;
    if(!message.member.roles.cache.some(x => x.id == "885181141156519957")){
      message.delete()
      message.author.send("**You need be an Admin or Higher to type in <#998435830358089739>!**")
    }
  }
})