 const client = require('../main.js')
const { Client, CommandInteraction, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
const ms = require("ms")
const f = require("node-fetch")
let baseurl = "https://bibleapi.tk/verse_fetch?verse=" 
let basedurl = "https://bibleapi.tk/verify_api/?img=true&dif=normal"
let baseddurl = "https://jc-api.bayumwoklia.repl.co/verify_api/?img=false&dif=normal"




client.on('messageCreate', async(message) => {
 if(message.author.bot || !message.guild){
	 return;
 }

	const VerifyRole = "886796972114182164"
   const IncludedText = "JC:"
    let msgArray = message.content.slice(IncludedText.length).trim().split(/ +/);
  
  let args = msgArray.slice(1);

const verse = args[0]

	

  
  let command = msgArray[0].replace(IncludedText, "");
  
 let q = await f(`${baseurl}/${verse}`)
                        
let FetchedVerse = await q.json()


	 let gh = await f(`${baseddurl}/`)
                        
let fetchedverify = await gh.json()

 console.log("I am reading messages")
   if(command === "verse"){
      console.log(`[🧾 Bible Event] Loaded the Bible Event: Scripture Detector`.blue.bold)
     if(args[0]){
       if(!FetchedVerse.error){
          console.log(`[🧾 Bible Event] API found the exact verse as the argument 0 as said `.green.bold)
          message.channel.send({content: ":white_check_mark:  Found a verse, here is everything", embeds: [new MessageEmbed()
      .setColor("GREEN")
      .setAuthor(`${FetchedVerse.reference}`)
                                                                      .setFooter(`${FetchedVerse.reference}, In Beta`)                                     
      .addFields(
		{ name: `Scripture`, value: `${FetchedVerse.text}` },
		{ name: 'Book Name', value:  `${FetchedVerse.verses['0'].book_name}`},
		{ name: 'Verse Chapter', value: ` ${FetchedVerse.verses['0'].chapter}`},
        { name: 'Chapter verse', value: ` ${FetchedVerse.verses['0'].verse} `})]})
        } else if (FetchedVerse.error){
           console.log(`[🧾 Bible Event] API failed to recieve the verse from argument 0 \n \n Status = 404`.red.bold)
          message.channel.send({content: ":x: Verse was not found in our database? \n \n > __***:information_source: Check your spelling or if it is a verse make sure it is there is a - between the bookname and the chapter and chapter verse like this John**-**3:5***___"})
        }
        
         
      } 
     }
     else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		 

		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}

	
  
  
  
   
 })

