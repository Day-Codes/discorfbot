const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "announcement-maker",
  description: "Make new announcements",
  type: 'CHAT_INPUT',
  adminOnly: true,
  options: [
    {
      name: "title",
      description: "The name of the announcement",
      type: "STRING",
      required: true,
    },
    {
      name: "description",
      description: "What is it about?",
      type: "STRING",
      required: true,
    },
	   {
      name: "color",
      description: "Add a color for the embed it can be color name to HEX, make sure its a valid color or it won't work",
      type: "STRING",
      required: true,
    },
      {
          name: "channel",
          description: "ticket-panel channel",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true,
      },
    {
      name: "footer",
      description: "The bottom of the announcement",
      type: "STRING",
      required: false,
    },
    {
      name: "image",
      description: "The image of the announcement Must be HTTPS",
      type: "STRING",
      required: false,
    },
     {
        name: "ping_role",
        description: "Which role do you want to ping",
        type: "ROLE",
        required: false,
        
      },
    {
      name: "field_title_1",
      description: "Add fields to the embed",
      type: "STRING",
      required: false,
    },
     {
      name: "field_header_1",
      description: "Add fields to the embed",
      type: "STRING",
      required: false,
    },

  ],
  run: async (client, interaction, args) => {
let msg = await interaction.followUp({content: "Getting ready to make an announcement"})
    var channels = client.channels.cache.get('1015878463233724537')

    let an_Title = interaction.options.getString('title');
    let an_Description = interaction.options.getString('description');
    let an_Footer = interaction.options.getString('footer');
    let an_Image = interaction.options.getString('image');
    let an_PingRole = interaction.options.getRole('ping_role')
                    let an_FieldOne_title = interaction.options.getString('field_title_1'); 
    let an_FieldOne_header = interaction.options.getString('field_header_1'); 
	  let an_Color = interaction.options.getString('color')
  let channel = interaction.options.getChannel("channel");
	
    
    //                  
    // Maybe next time 

 		const embedColorFieldImageFooter = new MessageEmbed()
	     .setColor(`${an_Color}`)
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
	    .addFields(
		{ name: `${an_FieldOne_title}`, value: `${an_FieldOne_header}` },
		)
    .setFooter(`${an_Footer}`)
     .setThumbnail(`${an_Image}`)
      .setImage(`${an_Image}`)

	  const embedColorFieldImagenoFooter = new MessageEmbed()
	    .setColor(`${an_Color}`)
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
	    .addFields(
		{ name: `${an_FieldOne_title}`, value: `${an_FieldOne_header}` },
		)
	    .setThumbnail(`${an_Image}`)
      .setImage(`${an_Image}`)

	  const embedColorFieldFooternoImage = new MessageEmbed()
	     .setColor(`${an_Color}`)
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
	    .addFields(
		{ name: `${an_FieldOne_title}`, value: `${an_FieldOne_header}` },
		)
    .setFooter(`${an_Footer}`)

	  const embedColorFieldnoFooternoImage = new MessageEmbed()
	     .setColor(`${an_Color}`)
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
	    .addFields(
		{ name: `${an_FieldOne_title}`, value: `${an_FieldOne_header}` },
		)
   

	  const embedColorImageFooter = new MessageEmbed()
	  .setColor(`${an_Color}`)
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
	  .setFooter(`${an_Footer}`)
     .setThumbnail(`${an_Image}`)
      .setImage(`${an_Image}`)

	  const embedColorImagenoFooter = new MessageEmbed()
	  .setColor(`${an_Color}`)
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
	   .setThumbnail(`${an_Image}`)
      .setImage(`${an_Image}`)

	  const embedColorFooternoImage = new MessageEmbed()
	   .setColor(`${an_Color}`)
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
	.setFooter(`${an_Footer}`)

		   const embedColornoFooternoImage = new MessageEmbed()
	   .setColor(`${an_Color}`)
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
	 
	  
    const embedNoFooter = new MessageEmbed()
      .setColor(`WHITE`)
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
      .setFooter(`An announcement by ${interaction.user.tag}`)

    const embed = new MessageEmbed()
      .setColor(`WHITE`)
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
      .setFooter(`${an_Footer}`)

    const embedWithImageNoFooter = new MessageEmbed()
      .setColor('WHITE')
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
      .setThumbnail(`${an_Image}`)
      .setImage(`${an_Image}`)

    const embedWithNoImageFooter = new MessageEmbed()
      .setColor('WHITE')
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
      .setFooter(`${an_Footer}`)

    const embedWithImageNFooter = new MessageEmbed()
      .setColor('WHITE')
      .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
      .setThumbnail(`${an_Image}`)
      .setImage(`${an_Image}`)
      .setFooter(`${an_Footer}`)

    embedWithFieldnoimagenofield = new MessageEmbed()
    .setColor('WHITE')
    .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
    .addFields(
		{ name: `${an_FieldOne_title}`, value: `${an_FieldOne_header}` },
		)

      embedWithFieldImageNoFooter = new MessageEmbed()
    .setColor('WHITE')
    .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
      .addFields(
		{ name: `${an_FieldOne_title}`, value: `${an_FieldOne_header}` },
		)
    .setThumbnail(`${an_Image}`)
      .setImage(`${an_Image}`)

        embedWithFieldFooterNoImage = new MessageEmbed()
        .setColor('WHITE')
    .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
      .addFields(
		{ name: `${an_FieldOne_title}`, value: `${an_FieldOne_header}` },
		)
    .setFooter(`${an_Footer}`)

    EmbedWithFieldImageFooter = new MessageEmbed()
     .setColor('WHITE')
    .setAuthor(`${an_Title}`)
      .setDescription(`${an_Description}`)
      .addFields(
		{ name: `${an_FieldOne_title}`, value: `${an_FieldOne_header}` },
		)
    .setFooter(`${an_Footer}`)
     .setThumbnail(`${an_Image}`)
      .setImage(`${an_Image}`)
   
    if (an_PingRole && an_Footer && an_Image && an_FieldOne_title && an_FieldOne_header){
        client.channels.cache.get(channel.id).send({ content: `:information_source: **${an_PingRole}**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorFieldImageFooter] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" }) 
    }
	  
      if (an_PingRole && !an_Footer && !an_Image && an_FieldOne_title && an_FieldOne_header)  {
       client.channels.cache.get(channel.id).send({ content: `:information_source: **${an_PingRole}**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorFieldnoFooternoImage] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" }) 
      } 
     if (an_PingRole && an_Footer && !an_Image && an_FieldOne_title && an_FieldOne_header){
       client.channels.cache.get(channel.id).send({ content: `:information_source: **${an_PingRole}**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorFieldFooternoImage] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" }) 
        } if (an_PingRole && !an_Footer && an_Image && an_FieldOne_title && an_FieldOne_header){
         client.channels.cache.get(channel.id).send({ content: `:information_source: **${an_PingRole}**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorFieldImagenoFooter] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })
      } 
        if (an_Footer && !an_PingRole && !an_Image && an_FieldOne_title && an_FieldOne_header){
           client.channels.cache.get(channel.id).send({ content: `:information_source: **no ping role**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorFieldFooternoImage] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" }) 
        }

         
           
       

    if (an_FieldOne_header && an_FieldOne_title && !an_Image && !an_PingRole && !an_Footer){
      client.channels.cache.get(channel.id).send({ content: `:information_source: **no ping role**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorFieldnoFooternoImage] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }

	      if (an_FieldOne_header && an_FieldOne_title && an_Image && !an_PingRole && !an_Footer){
      client.channels.cache.get(channel.id).send({ content: `:information_source: **no ping role**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorFieldImagenoFooter] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }
	   if (an_FieldOne_header && an_FieldOne_title && an_Image && !an_PingRole && an_Footer){
      client.channels.cache.get(channel.id).send({ content: `:information_source: **no ping role**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorFieldImageFooter] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }

	   if (an_Color && !an_FieldOne_header && !an_FieldOne_title && !an_Image && !an_PingRole && !an_Footer){
      client.channels.cache.get(channel.id).send({ content: `:information_source: **no ping role**! New announcement by ${interaction.user.tag}**`, embeds: [embedColornoFooternoImage] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }

	     if (an_Color && !an_FieldOne_header && !an_FieldOne_title && an_Image && !an_PingRole && !an_Footer){
        client.channels.cache.get(channel.id).send({ content: `:information_source: **no ping role**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorImagenoFooter] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }

	     if (an_Color && !an_FieldOne_header && !an_FieldOne_title && !an_Image && !an_PingRole && an_Footer){
        client.channels.cache.get(channel.id).send({ content: `:information_source: **no ping role**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorFooternoImage] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }

	   if (an_Color && !an_FieldOne_header && !an_FieldOne_title && !an_Image && an_PingRole && !an_Footer){
        client.channels.cache.get(channel.id).send({ content: `:information_source: **${an_PingRole}**! New announcement by ${interaction.user.tag}**`, embeds: [embedColornoFooternoImage] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }

	  if (an_Color && !an_FieldOne_header && !an_FieldOne_title && an_Image && an_PingRole && !an_Footer){
        client.channels.cache.get(channel.id).send({ content: `:information_source: **${an_PingRole}**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorImagenoFooter] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }

	  if (an_Color && !an_FieldOne_header && !an_FieldOne_title && !an_Image && an_PingRole && an_Footer){
        client.channels.cache.get(channel.id).send({ content: `:information_source: **${an_PingRole}**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorFooternoImage] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }

	  if (an_Color && !an_FieldOne_header && !an_FieldOne_title && an_Image && !an_PingRole && an_Footer){
        client.channels.cache.get(channel.id).send({ content: `:information_source: **no ping role**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorImageFooter] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }

	  if (an_Color && !an_FieldOne_header && !an_FieldOne_title && an_Image && an_PingRole && an_Footer){
        client.channels.cache.get(channel.id).send({ content: `:information_source: **${an_PingRole}**! New announcement by ${interaction.user.tag}**`, embeds: [embedColorImageFooter] }).then((m) => { m.react("✅") });
         msg.edit({ content: "The announcement should be send" })  
    }
	   
	
	  

	  
	  
    



     }
    }


