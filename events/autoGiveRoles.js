const client = require("../main");
const model = require("../models/custmsg")
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

console.log(`[🔓 PUBLIC] Loaded the Public-Event: Welcome Custom Message`.blue.bold)



client.on('guildMemberAdd', guildMember => {

	     model.findOne({ Array: Array }, async(err, data) => {
       if(!data) {
        		guildMember.user.send({content: `**Welcome to the discord server, <@${guildMember.user.id}>!**\n > now to verify that you aren't a robot, please do >verify in <#993664004201386034>. \n > ** Notes: We can detect self bots by uses of embeds and suspicious activity on the discord account. Self bots are against the TOS and you will recieve a ban if you do use a selfbot in Jesus Connect, Please uninstall/disable the SelfBot and don't use it in the server or discord!** `});

       }  else 
		      if(data){
		   data.Array.map((x, y) => {
			    guildMember.user.send({content: `${x.message}`})
		   })
		  
	   }
	
	console.log("New member joined :)")
	
    
})
	});
	