const client = require("../main");
const Chatbot  =  require("discord-chatbot");

const chatbot  =  new  Chatbot({name: "Udit", gender: "Male"});

client.on("message", async (message) => {
    if (message.author.bot) return
     if (message.channel.type === "dm"){
    const fetch = require("node-fetch").default;
                     
 	let data = await fetch(`https://api.dayln.tk/ai-chatbot`)
let json = await data.json()



        
  
      if (message.content.includes(`@`)) {
    return message.reply(`**:x: Please dont mention anyone**`);
  }
     {    
 
    	
 message.channel.startTyping();
setTimeout(function(){
    message.channel.stopTyping();
    message.reply(response);
}, 5000);

  }
    }
})
