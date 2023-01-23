 const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
 const model = require("../../models/warn")
 const dayjs = require("dayjs")

 module.exports = {
   name: 'warnings',
   category: "🎓 Punishment",
   description: "Fetch all a users warnings",
   type: 'CHAT_INPUT',
   options: [
     {
       name: `member`,
       description: `Pick a user to view warnings of`,
       type: "USER",
       required: true,
     }
   ],
     run: async (client, interaction, args) => {
     const user = interaction.options.getMember('member');
    let msg = await interaction.followUp({content: "Getting warn list of user"})
      
     model.findOne({Array: Array }, async(err, data) => {
       if(!data) {
          msg.edit({ content: `❗ ${user.user.tag} doesn't have any warnings!` })
       }  
		 

	if(data){
			    msg.edit({ embeds: [ new MessageEmbed()
       .setColor(`RED`)
       .setAuthor(`Here are the Warnings for ${user.user.tag}`, user.user.displayAvatarURL({ dynamic: true }))
      // .addFields(data.Array.map((x, y) => {,  { name: `ID: ${x.id} | Moderator: ${client.users.cache.get(x.mod).tag}`, value: `${x.reason} - ${dayjs(x.data).format('MMM D, YYYY')}`, inline: false, ephemeral: true, })] }) })
		// }

       
		 
     
     })
   }
 }