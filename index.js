const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
bot.commands = new Discord.Collection();

var config = JSON.parse(fs.readFileSync('./botconfig.json', 'utf-8'));

const yt_api_key = config.yt_api_key;
const bot_controller = config.bot_controller;
const prefix = config.prefix;
const token = config.token;

var queue = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];

bot.login(token);

bot.on('message', function (message) {
  const member = message.member;
  const mess = message.content.toLowerCase();











//Commands File Event

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`INFO: ${f} command file was loaded successfully!`);
    bot.commands.set(props.help.name, props);
  });
});


bot.on("ready", async () => {

  console.log(`INFO: ${bot.user.username} is online on ${bot.guilds.size} servers and watching ${bot.users.size} users!`);
  bot.user.setStatus('dnd')
});