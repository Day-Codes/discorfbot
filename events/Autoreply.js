const client = require("../main");

client.on("message", (message) => {
    if (message.content === "hi") {
        message.channel.send(`Hello!`);
       message.react('<a:Hey:989231982993092628>');
    }
    if (message.content === "sad") {
        message.channel.send(`Don't Be Sad!`);
    }
          if (message.content === "servers") {
        message.channel.send(`I am Active in ${client.guilds.cache.size} Servers`);
        }
         if (message.content === "hi") {
        message.react('<a:hi:931234711060226079> ');
        }
   
});