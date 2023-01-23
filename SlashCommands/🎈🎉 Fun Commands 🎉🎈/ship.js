const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ship',
    description: 'Ship two users',
    options: [
        {
            name: 'userone',
            description: "User 1 to ship",
            type: 'USER',
            required: true
        },
             {
            name: 'usertwo',
            description: "User two to ship",
            type: 'USER',
            required: true
        },
    ],


   
    run: async (client, interaction, args) => {
     let name = interaction.options.getUser('userone')
          let names = interaction.options.getUser('usertwo')
      // ----------------------------
          const love = Math.round(Math.random() * 100);
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        
        let loveEmbed = new MessageEmbed()
        .setTitle("Love percentage")
        .setDescription(`${name} loves ${names} this much: ${love}%\n\n${loveLevel}`)
        return interaction.followUp({ embeds: [loveEmbed] })
    }
}