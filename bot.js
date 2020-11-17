const express = require("express");
const app = express();
const http = require("http");
const jimp = require("jimp");
app.get("/", (request, response) => {
  console.log();
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
const ayarlar = require("./kobs.json");
const config = require("./kobs.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr");
const chalk = require("chalk");
require("./util/eventLoader")(client);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//--------------------------------KOMUTLAR-------------------------------\\



client.on('guildMemberAdd', async code => {
  
  const venom = config.sunucuid

  const phentos = config.kayitKanal;

  const embed = new Discord.MessageEmbed()

  
    .setTitle('Gods')

.setColor("RANDOM")
  
  client.guilds.cache.get(venom).channels.cache.get(phentos).send(`

  <a:raptiye:776591312832299069> ${code} **Sunucumuza Hoşgeldin. Seninle Beraber** ${code.guild.memberCount} **Kişiye Ulaştık**
  
  <a:hammer:776596774944899072>  **Hesabınızın Kuruluş Tarihi:** ${moment(code.user.createdAt).format('DD/MM/YYYY | HH:mm:ss')}

  <a:godsss:776596775070990366>  **Sesli Odalara Girerek Kaydınızı Yaptırabilirsiniz. <@&${config.teyitci}> Rölündeki Yetkililer Sizinle İlgilenecektir.**


  `)

});


//---------OTOISIM-------\\

client.on('guildMemberAdd', member => {


 member.setNickname('New To Gods')
})

//--------------------OTOTAG-------------\\

client.on("guildMemberAdd", async member => {
let judgedev = await db.fetch(`judgeteam?Ototag_${member.guild.id}`) 
let judgekanal = await db.fetch(`judgeteam?OtotagKanal_${member.guild.id}`)
if(!judgedev || !judgekanal) return
 
 member.setNickname(`${judgedev} ${member.user.username}`)
client.channels.cache.get(judgekanal).send(`**${member.user.username}** Adlı Kullanıcıya Otomatik Tag Verildi! :inbox_tray:`)
 
});

//-----------------OTO ROL 1---------------\\

client.on('guildMemberAdd', async member => {
  
let kanal1 = await db.fetch(`otorolkanal_${member.guild.id}`);
let kanal2 = member.guild.channels.cache.get(kanal1)

let rol1 = await db.fetch(`otorolrol_${member.guild.id}`);
let rol2 = member.guild.roles.cache.get(rol1)

if (!kanal2) return;
if (!rol2) return;
  
const embed = new Discord.MessageEmbed()

.setTitle('Gods - Otorol')

.setColor("GREEN")

.setDescription(`Sunucuya Katılan **${member}** Adlı Kullanıcıya Başarıyla \`${rol2.name}\` Rolü Verildi.`)

kanal2.send(embed)
  
member.roles.add(rol2)
});



//----------------OTO ROL 2-------------------\\


client.on('guildMemberAdd', async member => {
  
let kanal1 = await db.fetch(`otorolkanal2_${member.guild.id}`);
let kanal2 = member.guild.channels.cache.get(kanal1)

let rol1 = await db.fetch(`otorolrol2_${member.guild.id}`);
let rol2 = member.guild.roles.cache.get(rol1)

if (!kanal2) return;
if (!rol2) return;
  
const embed = new Discord.MessageEmbed()

.setTitle('Gods - Otorol')

.setColor("GREEN")

.setDescription(`Sunucuya Katılan **${member}** Adlı Kullanıcıya Başarıyla \`${rol2.name}\` Rolü Verildi.`)

kanal2.send(embed)
  
member.roles.add(rol2)
});


//----------------------------------\\

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = "ᵍᵒᵈˢ"; //tagınız
    let sunucu = "776108242739658773"; //sunucu ID
    let kanal = "776625028870438912"; //log kanal id
    let rol = "776623878558580752"; //tag alınca verilcek rol id
    if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
      client.channels.cache.get(kanal).send(`**${newUser}** **\${tag}\** **Tagını Aldığı İçin** **<@&${rol}>** **Rolünü Kazandı!**`)
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
    } if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
      client.channels.cache.get(kanal).send(`${newUser} **\${tag}\** **Tagını Çıkardığı İçin** <@&${rol}> **Rolünü Kaybetti!**`)
    }

  }
})





