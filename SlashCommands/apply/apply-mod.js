//client.guilds.cache.get("GUILD_ID").channels.cache.get("CHANNEL_ID").send()

const { client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const hastebin = require('hastebin-gen');
const axios = require('axios')
module.exports = {
    name: "apply-mod",
   nodefer: false,
    category: ":beginner: Info",
    description: "Apply your server for staff",
    type: 'CHAT_INPUT',
     finishedCommand: false, // This is the most important part, add this to your slash command
  options: [
        {
          name: "one",
          description: "what your discord username and id",
          type: "STRING",
          required: true,
        },
         {
          name: "two",
          description: "age range is fine!",
          type: "STRING",
          required: true,
        },
          {
          name: "three",
          description: "What is your time zone?",
          type: "STRING",
          required: true,
        },    {
          name: "four",
          description: "why should we hire you over other applicants?",
          type: "STRING",
          required: true,
        },    {
          name: "five",
          description: "do you have any previous experience? Please add member count and invites. ",
          type: "STRING",
          required: true,
        },    {
          name: "six",
          description: "what is your weeknesses and strengths?",
          type: "STRING",
          required: true,
        },    {
          name: "seven",
          description: "in your own terms,what is a moderator?",
          type: "STRING",
          required: true,
        },    {
          name: "eight",
          description: "a user started to spam our chat? what would be your first response be as a trial Mod?",
          type: "STRING",
          required: true,
        },    {
          name: "nine",
          description: "if you get a report of DM Advertisng, what would you do?",
          type: "STRING",
          required: true,
        },    {
          name: "ten",
          description: "a user started spamming nsfw content, how would you handle it",
          type: "STRING",
          required: true,
        },    {
          name: "eleven",
          description: "there was a threat of raiding the server, how would you prevent it?",
          type: "STRING",
          required: true,
        },    {
          name: "twelve",
          description: "do you agree to complete all task and fulfil the requirements that from a user in your position",
          type: "STRING",
          required: true,
        },    {
          name: "thirteen",
          description: "do you accpet to be invided into the staff server if you get accpeted?",
          type: "STRING",
          required: true,
        },    {
          name: "fourteen",
          description: "Do you have 2fa?",
          type: "STRING",
          required: true,
        },    {
          name: "fifteen",
          description: "anything you want to add? (if not do N/A)",
          type: "STRING",
          required: true,
        },
    ],
    
    run: async (client, interaction, args) => {

         if(!client.config.owner.includes(interaction.user.id)) return msg.edit(`🔒 This command is locked to owners only!`)
      
      const one = interaction.options.getString("one")
        const two = interaction.options.getString("two")
      const three = interaction.options.getString("three")
        const four = interaction.options.getString("four")
          const five = interaction.options.getString("five")
        const six = interaction.options.getString("six")
          const seven = interaction.options.getString("seven")
        const eight = interaction.options.getString("eight")
      const nine = interaction.options.getString("nine")
        const ten = interaction.options.getString("ten")
          const eleven = interaction.options.getString("eleven")
        const twelve = interaction.options.getString("twlve")
          const thirteen = interaction.options.getString("thirteen")
        const fourteen = interaction.options.getString("fourteen")
      const fifteen = interaction.options.getString("fifteen")       
      let msg = await interaction.followUp(`Sending Application!`)

   const apply = new MessageEmbed()
      .setTitle("Thunder Promotions | Mod Application")
      .setDescription(`1. Discord User + ID, \n ${one} \n 2. Age, \n ${two} \n 3. Timezone, \n ${three} \n 4. Why Should We choose you, \n ${four} \n 5. do you have any previous experience? If so, please go into details, if possible, make sure to mention: Member Count & Server Invites, \n ${five} \n 6. what is your weeknesses and strengths, \n ${six} \n 7. In your words what is a moderator, \n ${seven} \n 8. a user started to spam our chat? what would be your first response be as a trial Mod, \n ${eight} \n 9. You got a report of a DM Advertisor what would you do, \n ${nine} \n 10. a user started to spam NSFW how would you react, \n ${ten} \n 11. The server got a report of a raid, how would you prevent this?, \n ${eleven} \n 12. Do you agree to complete your weekly task and fulfil the requirements that is expected from someone in your positon, \n ${twelve}\n 13. Do you agree to join our staff server if you get accpeted? \n ${thirteen} \n 14. Do you have 2FA, \n ${fourteen} \n 15. Do you have any other questions, \n ${fifteen} \n \n  This is the end of the mod application | Made by Cheif Development officer and thunder promotions.`)
     .setColor("BLUE")
      .setFooter("Note: plese use ?open <user id> to accpet!")
  
client.guilds.cache.get("1041004654995185664").channels.cache.get("1044269406731112458").send({ embeds: [apply] }).then(function (message) {
            message.react("👍")
            message.react("👎")
            message.startThread({
                name: `Application`,
                autoArchiveDuration: 60,
                type: 'GUILD_PUBLIC_THREAD'
            });
        });
 

          setTimeout(() => {
        msg.edit({ content:  `Sent your application off! if you have any more questions please dm our modmail bot.`, ephemeral: true});
      }, 5000);
    },     
};
