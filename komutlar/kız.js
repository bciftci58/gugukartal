const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  
 if(!message.member.roles.cache.has("776073055771557898"))
 if (!message.member.roles.cache.has("775385548973670430"))
 if(!message.member.roles.cache.has("775100829756948541"))
	 
 return message.channel.send('**Bu kodu kullanmak için yeterli yetkin yok!**')
  
  
  let user = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  
  
  
  let member = message.mentions.members.first();
  
  let isim = args[1]
  let yaş = args[2]
  let al = "777540506531135528";
  let ver = "776108061819273236";
  
  if (!member) return message.channel.send("**Bir Kullanıcı Etiketle**");
    if (!isim) return message.channel.send("**Bir İsim Yazmalısın**");

   
    member.setNickname(`'${isim}`);
  
    member.roles.add(ver);
    member.roles.remove(al);
  

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Kayıt İşlemi Başarılı.")
    .setImage("https://cdn.discordapp.com/attachments/775385920152272906/778050996785250304/image0.gif")
    .setDescription(`
**Kayıt Edilen Kullanıcı** : ${user}
**Kayıt Eden Yetkili** : <@!${message.author.id}>

**Kayıt İşleminde Verilen Rol** : 
<@&776108061819273236> 

**Kayıt İşleminde Alınan Rol** :
<@&777540506531135528> 
`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kız" , "k"],
  permLevel: 0
}
exports.help = {
  name: 'kız',
  description: "Kız Kayıt Sıstemı",
  usage: 'Kız isim yaş'
}