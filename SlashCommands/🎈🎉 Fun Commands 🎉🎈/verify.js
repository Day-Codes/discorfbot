const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { readdirSync } = require("fs");
const ms = require("ms")
const f = require("node-fetch")
let basedurl = "https://jc-api.bayumwoklia.repl.co/verify_api/?img=true&dif=normal"
let baseddurl = "https://jc-api.bayumwoklia.repl.co/verify_api/?img=false&dif=normal"



module.exports = {
    name: "verify",
    description: "(On development) Verification system",
    type: 'CHAT_INPUT',
   options: [
      {
        name: "verify_code",
        description: "Your question",
        type: "STRING",
        required: false,
      }
    ], 
    run: async (client, interaction, args) => {

   
		
         question = interaction.options.getString(`verify_code`);

let msg = await interaction.followUp({content: "Verifing working...."})
		
		 if(question){
			  let gh = await f(`${baseddurl}/`)
                        
 let  fetchedverify = await gh.json()
			 
			 msg.edit({content: "Please type in the letters in the image", embeds: [new MessageEmbed()
		.setAuthor(`Please write the following message "${fetchedverify.puzzles.text}"`)
		.setFooter(`Verification`)
		.setImage(`${basedurl}`)
																							   ]})
		 } 

		if(!question){
			msg.edit({content: "null"})
		}
		 

	}

}