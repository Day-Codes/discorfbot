const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const f = require("node-fetch")
let baseurl = "https://jc-api.bayumwoklia.repl.co/verse_fetch?verse=" 

module.exports = {
    name: "verse-fetch",
    description: "Fetch a verse from the bible",
    type: 'CHAT_INPUT',
     options: [
    {
      name: `verse`,
      description: `The verse you want to fetch`,
      type: "STRING",
      required: true,
    },
  ],
    run: async (client, interaction, args) => {
       const verse = interaction.options.getString('verse');
      
        let q = await f(`${baseurl}/${verse}`)
                        
      let FetchedVerse = await q.json()

    let msg = await interaction.followUp(`Fetching and getting ready`)
     
  
	
 if(FetchedVerse.error){
   return msg.edit({content: ":x: Verse was not found in our database? \n \n > __***:information_source: Check your spelling or if it is a verse make sure it is there is a - between the bookname and the chapter and chapter verse like this John**-**3:5***___"})
   
 }
      if(!FetchedVerse.error){
           
        
         return msg.edit({content: ":white_check_mark:  Found a verse, here is everything", embeds: [new MessageEmbed()
      .setColor("GREEN")
      .setAuthor(`${FetchedVerse.reference}`)
                                                                      .setFooter(`${FetchedVerse.reference}, In Beta`)                                     
      .addFields(
		{ name: `Scripture`, value: `${FetchedVerse.text}` },
		{ name: 'Book Name', value:  `${FetchedVerse.verses['0'].book_name}`},
		{ name: 'Verse Chapter', value: ` ${FetchedVerse.verses['0'].chapter}`},
        { name: 'Chapter verse', value: ` ${FetchedVerse.verses['0'].verse} `})]})
      }
     
    }
}