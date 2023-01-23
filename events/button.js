const client = require("../main");
const { WebhookClient, Message, MessageEmbed } = require("discord.js");
const td = require('truth-dare');
const axios = require('axios')
const r = require('better-tord');

client.on('interactionCreate', async (interaction) => {
 
    if (!interaction.isButton()) return;
console.log(interaction);
    if (interaction.customId == "truth") {
 //        let ok = async () => {
 // let wow = await axios.get('https://api.outerapi.tk/truth');
 // let ee = wow.data
 // return ee
//}
//let eeValue = await ok();
//console.log(eeValue)
        // Do what you want with button 'id1'.
      const truth = r.get_truth();
console.log(truth);
      
      const tr = new MessageEmbed()
      .setTitle("Here is your truth")
      .setDescription(`${truth}`)
      .setColor("RANDOM")
      interaction.reply({ content: "Make sure to reply", embeds:[tr], })
    }

   if (interaction.customId == "dare") {
         let ok = async () => {
  let wow = await axios.get('https://api.outerapi.tk/dare');
  let ee = wow.data
  return ee
}
let eeValue = await ok();
console.log(eeValue)
        // Do what you want with button 'id1'.
     

      
      const dar = new MessageEmbed()
      .setTitle("Here is your dare:")
      .setDescription(`${eeValue.result}`)
      .setColor("RANDOM")
      interaction.reply({ content: "Complete the dare", embeds:[dar], })
    }
});

