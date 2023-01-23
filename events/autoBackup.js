const client = require("../main.js");
const db = require(`quick.db`);
const backup = require('discord-backup');
client.on("ready", () => {
  console.log(`(/) Starting Auto-Backup Module`.brightGreen.bold)
  
  setInterval(async() => {
    client.guilds.cache.forEach(async(x) => {
      const autobackup = db.get(`autobackup_${x.id}`);
      const backup_ch = db.get(`backupch_${x.id}`);
      
      if(autobackup) {
        let array = []
        array.push(`${x.name}`);
        console.log(`🔶 Auto Backups found for the Server: ${array.join(", ")}`.brightRed.bold)
  
        console.log(`(\\) Creating Auto-Backup for ${x.name}`.brightGreen.bold)
        backup.create(x).then(async (backupData) => {
          const bkID = db.get(`backupid_auto_${x.id}`);
          x.channels.cache.get(backup_ch).bulkDelete(1, true);
          x.channels.cache.get(backup_ch).send(`<:Like:922852837636055051> **Auto Backup Created:** \`${backupData.id}\``)
          
          if(bkID) await backup.remove(bkID);
          db.set(`backupid_auto_${x.id}`, backupData.id)
        })
        console.log(`(/) Created a Auto-Backup for ${x.name}`.brightBlue.bold)
      }
    })
  }, 10800000); // 3h: 10800000
})