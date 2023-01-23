const client = require("../main");
const axios = require('axios')
client.on("message", async message => {
  if(message.channel.name === "gf-chat" && !message.author.bot) {    
    let ok = async () => {
  let wow = await axios.get('https://api.dayln.tk/ai-chatbot');
  let ee = wow.data
  return ee
}
let eeValue = await ok();
console.log(eeValue)
 //   let reply = await chat.chat(message.content)

   

setTimeout(function(){
    message.reply(`${eeValue.result}`);
}, 1000);

  }
  });