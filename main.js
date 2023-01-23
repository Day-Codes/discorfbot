const { Client, Collection, channel } = require("discord.js");
const colors = require("colors")
const model = require("./models/eco")
const model2 = require("./models/tkn")
require('dotenv').config()
const Cluster = require('discord-hybrid-sharding');
const client = new Client({
    shards: Cluster.data.shardsPerClusters, 
    shardCount: Cluster.data.TOTAL_SHARDS, 
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection()
client.slashCommands = new Collection()
client.config = require("./config.json")
client.cluster = require('discord-hybrid-sharding');

// Initializing the project
require("./handler/index")(client)
require("./events/ready")
if(client.config.hostingweb == true) {
require("./webhost")();
}

client.on('debug', console.log)
client.login(process.env.TOKEN)

// Giveaway Manager
const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: `${client.config.color.green}`,
    embedColorEnd: `${client.config.color.red}`,
    reaction: `🎉`,
    lastChance: {
      enabled: true,
      content: `**Giveaway ending soon, last chance to enter!**`,
      threshold: 5000,
      embedColor: `${client.config.color.orange}`
    }
  }
});
/*           ANTI CRASHING            ¦¦           ANTI CRASHING           */ 
  process.on('unhandledRejection', (reason, p) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] unhandled Rejection:'.toUpperCase().red.dim);
    console.log(reason.stack ? String(reason.stack) : String(reason).yellow.dim);
    console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log('\n\n\n\n\n\n[🚩 Anti-Crash] uncaught Exception'.toUpperCase().red.dim);
    console.log(err.stack.yellow.dim ? err.stack.yellow.dim : err.yellow.dim)
    console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().red.dim);
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('[🚩 Anti-Crash] uncaught Exception Monitor'.toUpperCase().red.dim);
  });
  process.on('beforeExit', (code) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] before Exit'.toUpperCase().red.dim);
    console.log(code);
    console.log('=== before Exit ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on('exit', (code) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] exit'.toUpperCase().red.dim);
    console.log(code.yellow.dim);
    console.log('=== exit ===\n\n\n\n\n'.toUpperCase().red.dim);
  });
  process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n\n\n\n\n[🚩 Anti-Crash] multiple Resolves'.toUpperCase().red.dim);
    console.log(type, promise, reason.yellow);
    console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase().red.dim);
  });

// Console

const { red, green, blue, magenta, cyan, white, gray, black } = require("chalk");


// 💎Economy Section💎
client.boosterId = '895445684826816564';

client.bank = (id) => new Promise(async(ful) => {
  let v = await model.findOne({id})
  if(!v) return ful(0)
  ful(v.coins)
})
client.addCoins = (id, coins) => {
  model.findOne({ id }, async(err, data) => {
    if(!data){
      new model({
        id,
        coins,
      }).save()
    } else {
      v = data.coins+coins
      let x = await model.findOneAndUpdate({ id: id }, {coins:v})
    }
  })
}
client.rmvCoins = (id, coins) => {
  model.findOne({ id }, async(err, data) => {
    if(!data){
      new model({
        id,
        coins: -coins,
      }).save()
    } else {
      v = data.coins-coins
      let x = await model.findOneAndUpdate({ id: id }, {coins:v})
    }
  })
}
client.setCoins = (id, coins) => {
  model.findOne({ id }, async(err, data) => {
    if(!data){
      new model({
        id,
        coins: coins,
      }).save()
    } else {
      let x = await model.findOneAndUpdate({ id: id }, {coins:coins})
    }
  })
}


client.tokens = (id) => new Promise(async(ful) => {
  let v = await model2.findOne({id})
  if(!v){
    new model2({
    id,
    tokens,
  }).save()
  } 
  else {
    ful(v.tokens)
  }
  
})
 
client.addTokens = (id, tokens) => {
  model2.findOne({ id }, async(err, data) => {
    if(!data){
      new model2({
        id,
        tokens,
      }).save()
    } else {
      v = data.tokens+tokens
      let x = await model2.findOneAndUpdate({ id: id }, {tokens:v})
    }
  })
}
client.rmvTokens = (id, tokens) => {
  model2.findOne({ id }, async(err, data) => {
    if(!data){
      new model2({
        id,
        tokens: -tokens,
      }).save()
    } else {
      v = data.tokens-tokens
      let x = await model2.findOneAndUpdate({ id: id }, {tokens:v})
    }
  })
}
client.setTokens = (id, tokens) => {
  model2.findOne({ id }, async(err, data) => {
    if(!data){
      new model2({
        id,
        tokens,
      }).save()
    } else {
      let x = await model2.findOneAndUpdate({ id: id }, {tokens:tokens})
    }
  })
}
// 💎Economy Section💎


// moogodb connect
const mongoose = require("mongoose");

 mongoose.connect(process.env.MONGO, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(console.log(`🏆 Loading MONGO database`))
// mongodb connect