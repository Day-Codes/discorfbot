const Cluster = require('discord-hybrid-sharding');

const manager = new Cluster.Manager(`./main.js`, {
    totalShards: 1, // Use 'auto' if u want it to be Auto.
    shardsPerClusters: 1, 
    mode: 'process' , 
    token: process.env.TOKEN,
    usev13: true,
});

manager.on('clusterCreate', cluster => console.log(`[🔷 SHARD/CUSTER] ${cluster.id}`));
manager.spawn({ timeout: -1 });
//h