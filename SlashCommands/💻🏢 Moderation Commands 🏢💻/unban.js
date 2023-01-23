const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);


module.exports = {
    name: "unban",
    description: "unBan a discord user",
    type: 'CHAT_INPUT',
  options: [
       {
          name: "userid",
          description: "The user you want to unban",
          type: "STRING",
          required: true,
      },
     {
          name: "reason",
          description: "Why have you choosen this user to be back in to the server?",
          type: "STRING",
          required: false,
      }, 
           ],
    run: async (client, interaction, args) => {


            userid = interaction.options.getString(`userid`);
  
      
          if (isNaN(userid)) return interaction.channel.send({embeds: [new MessageEmbed()
                .setColor("RED")
  
                .setDescription("**You need to provide an ID.**")
                .setFooter("Unban command")]}
            
        )

      
     let reason = interaction.options.getString(`reason`);
  let bannedMember = await client.users.fetch(userid)
        let banMember =  await client.users.fetch(userid)
        if (!banMember) {
            const missingArgs = new MessageEmbed()
                .setColor("RED")
                .setTitle("Missing arguments")
                .setDescription(`
                                **Name** : ban\n
                                **Description** :Bans a Member from a Guild\n
                                **aliases** : jabsdk\n
                                **usage**: ban <@user/ID> [reason]\n `)
                .setFooter("Ban command")
                .setTimestamp()
            return interaction.channel.send({embeds: [missingArgs]});
        }
        
        if (!reason) reason = "no reason"

        if (!interaction.guild.me.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return interaction.reply({embeds: [ new MessageEmbed()
                .setColor("RED")
  
                .setDescription("I dont have the permissions to ban users!")
                .setFooter("Ban command")]}
           
        )

      

       interaction.guild.members.unban(bannedMember, reason).catch(err => console.log(err.toString().red))
        let Sembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`> You've been unbanned from **${interaction.guild.name}** because of ${reason}. You are permanently Unbanned.`)
            .setFooter("Unban command")

        // invite link
      

        try {
            interaction.guild.channels.cache.get(interaction.channel.id).createInvite().then(invite =>
              
                bannedMember.send({content:  `${invite.url}`, components: [new Discord.MessageActionRow()
          .addComponents([
            new Discord.MessageButton()
            .setStyle(`LINK`)
            .setLabel(`Join the server`)
            .setURL(`${invite.url}`)
            .setEmoji(`🛑`)
            ])], embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setTitle(`${interaction.guild.name} Join Now`)
                        .setDescription(`Invite Link is here \n ${invite.url}`)
                        
                        .setFooter("Unban command")]})     
            

                
            );
        }

        catch (error) {
            console.error(`I could not create the invite for the channel: ${error}`);
            interaction.channel.send(`You have to paste a correct channel ID!`);
        }

        bannedMember.send({content: "User unbanned succesfully", embeds:[Sembed]}).catch(err => console.log(err.toString().red))
        let embed = new MessageEmbed()
            .setColor("RED")
            .setFooter("Unban command")
            .setDescription(`✅ User successfully Unbanned!`)
        interaction.followUp({embeds: [embed]}).catch(err => console.log(err.red))

      
    }
}

