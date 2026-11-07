// 💐 REHMAN-MD Bot Configuration - FINAL FLAT - GitHub + Railway Ready
// No Owner folder needed

const fs = require('fs');
const path = require('path');

// ===============================
// 👑 Owner - Flat fix, Owner folder nahi chahiye
// ===============================
let ownerNumber = ["923410000000"]; // <-- Yahan apna number daal do
try {
  // Agar Owner folder ho to le le, warna default chalega
  const ownerPath = path.join(__dirname, 'Owner', 'owner.js');
  if (fs.existsSync(ownerPath)) {
    const loaded = require(ownerPath);
    if (loaded) ownerNumber = loaded;
  } else {
    const ownerPath2 = path.join(__dirname, 'owner.js');
    if (fs.existsSync(ownerPath2)) {
      const loaded2 = require(ownerPath2);
      if (loaded2) ownerNumber = loaded2;
    }
  }
} catch {}

// ===============================
// 🖼️ Thumbnail System - Flat
// ===============================
let thumbBuffer = null;
let thumbPath = "";
const possiblePaths = [
  path.join(__dirname, 'thumbnail.png'),
  path.join(__dirname, 'thumbnail.jpg'),
  path.join(__dirname, 'media', 'thumbnail.png'),
  path.join(__dirname, 'media', 'thumbnail.jpg'),
  path.join(__dirname, '..', 'thumbnail.png')
];

for (const p of possiblePaths) {
  try {
    if (fs.existsSync(p)) {
      thumbBuffer = fs.readFileSync(p);
      thumbPath = p;
      console.log(`✅ Thumbnail loaded: ${p}`);
      break;
    }
  } catch {}
}

if (!thumbBuffer) console.log("⚠️ thumbnail.png nahi mila! Main folder me rakho");

// ===============================
// 📢 Channel Info
// ===============================
const channelInfo = {
  newsletterJid: "0029VbE5Hc53wtb1OeF8h01y@newsletter",
  newsletterName: "REHMAN-MD 💐",
  channelLink: "https://whatsapp.com/channel/0029VbE5Hc53wtb1OeF8h01y",
  thumbnail: thumbPath || "./thumbnail.png",
  serverMessageId: 1
};

const config = {
  // 👑 Owner Info
  ownerNumber: Array.isArray(ownerNumber) ? ownerNumber : [ownerNumber],
  ownerName: '💐 REHMAN-MD 💐',
  botName: '💐 REHMAN-MD 💐',
  signature: '> 𝙍𝙀𝙃𝙈𝘼𝙉-𝙈𝘿 💐',
  youtube: channelInfo.channelLink,
  channel: channelInfo.channelLink,
  channelInfo: channelInfo,

  // 🖼️ Thumbnail
  thumbnail: thumbPath || "./thumbnail.png",
  thumbBuffer: thumbBuffer,
  thumbnailUrl: "./thumbnail.png",
  botLogo: "./thumbnail.png",
  menuImage: "./thumbnail.png",

  // 🔐 Pair Code
  remotePairCode: 'REHMANMD',

  // ⚙️ Feature Toggles
  autoTyping: false,
  autoReact: false,
  autoStatusView: false,
  public: true,
  antiLink: false,
  antiLinkKick: false,
  antiBug: false,
  greetings: true,
  readmore: false,
  ANTIDELETE: true,
  autoRead: false,
  autoRecording: false
};

// ✅ Global - case.js aur auto files isi ko read karti hain
global.owner = (
  Array.isArray(config.ownerNumber) ? config.ownerNumber : [config.ownerNumber]
).map(num => String(num).replace(/\D/g, '') + '@s.whatsapp.net');

global.thumbnail = thumbBuffer;
global.thumbBuffer = thumbBuffer;
global.botThumbnail = thumbBuffer;
global.menuImage = thumbPath;
global.channelInfo = channelInfo;

// Auto globals for your 9 files
if (global.antilink === undefined) global.antilink = {};
if (global.antilinkick === undefined) global.antilinkick = {};
if (global.antidelete === undefined) global.antidelete = {};
if (global.autostatus === undefined) global.autostatus = false;
if (global.autoreact === undefined) global.autoreact = false;
if (global.autogreet === undefined) global.autogreet = {};
if (global.autotyping === undefined) global.autotyping = false;
if (global.autorecording === undefined) global.autorecording = false;
if (global.autoread === undefined) global.autoread = false;
if (global.ANTIDELETE === undefined) global.ANTIDELETE = true;

function loadSettings() {
  return config;
}

module.exports = { loadSettings, config, channelInfo };
module.exports.config = config;