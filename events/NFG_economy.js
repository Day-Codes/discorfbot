const client = require("../main");
const { MessageEmbed, Collection, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")
let model = require("../models/prd")
console.log(`[🔑 PRIVATE] Loaded the Private-Event: Economy-System`.blue.bold)
client.on("interactionCreate", async (interaction) => {
  if(!interaction.isButton() && !interaction.isSelectMenu()) return;

    if(interaction.customId == `azu_bank`) {
      let y = await client.tokens(interaction.user.id)
      let z = await client.bank(interaction.user.id)
      z = `${z} Coins  |  ${y} Tokens`

      let array = 0
      model.find({}, async(err, data) => {
        data.forEach((x) => {
          array = array+1   
        })
      })

      const embed = new MessageEmbed()
      .setColor('#2f3136')
      .setDescription('Earn coins to earn cool shit')
      .setTitle(`\\🏦 \`NFG • Bank\` \\🏦`)
      .addField(`\\🪙 Your Coins:`, `\`${z}\``)
      .addField(`\\💼 Your Inventory:`, `\`In progress\``)
      // .addField(`\\🛒 Items for sale:`, `\`${array} Items in Stock\`\n***Use \`/store\` to see more information!***`)
      .setFooter(`NFG economy`)
      interaction.reply({ content: ` `, embeds: [embed], ephemeral: true })
    }
})