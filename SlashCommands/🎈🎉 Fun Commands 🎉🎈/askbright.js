const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { readdirSync } = require("fs");

   // Responses configuration
      
      const defaultresponses = ["I don't know", "Why are you asking me this", "Thats not funny", "Maybe", "You should check probably check google","No thank you", "Stop asking me weird questions dude", "I Don't know, you should go to therapy", "Uhmm", "i really don't feel comfortable answering this", "...","Dude toddlers know this", "You must be trolling", "thats seriously not funny", "You should know this", "Thats a question someone who isn't following the AGE tos would ask","I don't really know if you are trying to be funny or being serious", "thats seriously stupid", "*Wow, soooo funny*","most of them are cool are most of them are just awful","i don't know"]

      
 

module.exports = {
    name: "ask_bot",
    description: "If you really wanna waste your time or kill some time, i guess this is method",
    type: 'CHAT_INPUT',
   options: [
      {
        name: "question",
        description: "Your question",
        type: "STRING",
        required: true,
      }
    ], 
    run: async (client, interaction, args) => {

   
         question = interaction.options.getString(`question`);
      
  


        const botans = new MessageEmbed()
                .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setColor('RANDOM')
            .setTitle(`Ask Bot`)
            .setDescription(`Someone dude Asked Me: \n\`${question}?\` \nAnd Heres my Answer for it: \n | \n V`)
            .setTimestamp();
        interaction.channel.send(botans).then(() => interaction.delete());

          const row = new MessageActionRow()
			.addComponents([
       new MessageButton()
			  .setEmoji(`📝`)
	.setLabel(`${defaultresponses[Math.floor(Math.random() * defaultresponses.length)]}`)
        .setDisabled(true)
				.setStyle('PRIMARY')
        .setCustomId(`ButtonResponse`), 
      ]);

               interaction.followUp({content: "Here is your answer", embeds: [botans], components: [row] })



      
    }
         
   


    }