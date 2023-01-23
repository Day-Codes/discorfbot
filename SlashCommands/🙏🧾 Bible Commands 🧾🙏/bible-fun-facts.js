const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { readdirSync } = require("fs");

   // Responses configuration
  const baseurl = "https://jc-api.bayumwoklia.repl.co/"    
const f = require("node-fetch")
      
 

module.exports = {
    name: "bible-facts",
    description: "Wanna learn more about the bible learn some fun facts", 
		type: 'CHAT_INPUT',
	options: [
    {
        name: "amount",
        description: "Select how many facts do you want to see",
        type: "STRING",
        required: false,
        choices: [
          { name: `2 facts`, value: `2` },
          { name: `3 facts`, value: `3` },
          { name: `4 facts`, value: `4` },
          { name: `5 facts`, value: `5` },
        ]
      },
		], 
    run: async (client, interaction, args) => {

 
         
      let q = await f(`${baseurl}/bible_fact`)
                        
      let FetchedVerse = await q.json()

		  if(FetchedVerse.error){
			interaction.followUp({content: "You have been rate limited"})
			  return;
		}
  
let bf_am = interaction.options.getString('amount');

         const botans1 = new MessageEmbed()
                .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setColor('RANDOM')
            .setTitle(`Bible Facts`)
            .setDescription(`Heres the fun fact for you!`)
          .addFields(
		{ name: `Fun Fact 1`, value: `${FetchedVerse[1].text}` })
            .setTimestamp();

		const botans2 = new MessageEmbed()
		 .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setColor('RANDOM')
            .setTitle(`Bible Facts`)
            .setDescription(`Heres the fun fact for you!`)
          .addFields(
		{ name: `Fun Fact 1`, value: `${FetchedVerse[1].fact}` }, 
		{ name: `Fun Fact 2`, value: `${FetchedVerse[2].fact}`},
		  )
            .setTimestamp();

		const botans3 = new MessageEmbed()
		 .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setColor('RANDOM')
            .setTitle(`Bible Facts`)
            .setDescription(`Heres the fun fact for you!`)
          .addFields(
		{ name: `Fun Fact 1`, value: `${FetchedVerse[1].text}` }, 
		{name: `Fun Fact 2`, value: `${FetchedVerse[2].text}`},
		{name: `Fun Fact 3`, value: `${FetchedVerse[3].text}`},
		  )
            .setTimestamp();

		const botans4 = new MessageEmbed()
		 .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setColor('RANDOM')
            .setTitle(`Bible Facts`)
            .setDescription(`Heres the fun fact for you!`)
          .addFields(
		{ name: `Fun Fact 1`, value: `${FetchedVerse[1].text}`}, 
		{name: `Fun Fact 2`, value: `${FetchedVerse[2].text}`}, 
		{name: `Fun Fact 3`, value: `${FetchedVerse[3].text}`},
		{name: `Fun Fact 4`, value: `${FetchedVerse[4].text}`},
		  )
            .setTimestamp();

		const botans5 = new MessageEmbed()
		 .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
            .setColor('RANDOM')
            .setTitle(`Bible Facts`)
            .setDescription(`Heres the fun fact for you!`)
          .addFields({ name: `Fun Fact 1`, value: `${FetchedVerse[1].text}`},
					 {name: `Fun Fact 2`, value: `${FetchedVerse[2].text}`},
					 {name: `Fun Fact 3`, value: `${FetchedVerse[3].text}`},
					 {name: `Fun Fact 4`, value: `${FetchedVerse[4].text}`},
					 {name: `Fun Fact 5`, value: `${FetchedVerse[5].text}`},
					)
            .setTimestamp();

       
				if(!bf_am){
					               interaction.followUp({content: ":white_check_mark: Heres a fact", embeds: [botans1] })
									return;
									

				}

		if(bf_am === '2'){
			 interaction.followUp({content: ":white_check_mark: Heres a fact", embeds: [botans2] })
			
		}else 

		if(bf_am === '3'){
			 interaction.followUp({content: ":white_check_mark: Heres a fact", embeds: [botans3] })
			
		}else

		if(bf_am === "4"){
			 interaction.followUp({content: ":white_check_mark: Heres a fact", embeds: [botans4] })
			
		}else

		if(bf_am === '5'){
			 interaction.followUp({content: ":white_check_mark: Heres a fact", embeds: [botans5] })
			
		}

		

		



      
    }
         
   


    }