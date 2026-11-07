// REHMAN-MD - Clean & Readable Command Handler - FINAL FLAT VERSION
// Owner Reply = THE OWNER IS DIED 🥹 - setting.js se

const fs = require("fs");
const path = require("path");
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");

if (!global.mode) global.mode = "self";

// ===============================
// 🔥 Load setting.js for owner reply
// ===============================
let ownerDeadReply = "𝐓𝐇𝐄 𝐎𝐖𝐍𝐄𝐑 𝐈𝐒 𝐃𝐈𝐄𝐃 🥹";
try {
  const setting = require("./setting");
  if (setting.config && setting.config.ownerDeadReply) {
    ownerDeadReply = setting.config.ownerDeadReply;
  }
} catch {}

// ===============================
// 🖼️ Thumbnail Loader - Flat
// ===============================
let localThumb = null;
let localThumbPath = path.join(__dirname, "thumbnail.png");
let altThumbPath = path.join(__dirname, "thumbnail.jpg");
try {
  if (fs.existsSync(localThumbPath)) {
    localThumb = fs.readFileSync(localThumbPath);
    console.log("✅ Thumbnail loaded: thumbnail.png");
  } else if (fs.existsSync(altThumbPath)) {
    localThumb = fs.readFileSync(altThumbPath);
    localThumbPath = altThumbPath;
    console.log("✅ Thumbnail loaded: thumbnail.jpg");
  } else {
    console.log("⚠️ thumbnail.png not found in same folder");
  }
} catch (e) {
  console.log("Thumb load error:", e.message);
}

// ===============================
// ⚙️ Owner Only & Auto Commands
// ===============================
const ownerOnlyCommands = [
  "video2", "song2", "kick", "add", "nice", "tagall",
  "antilink", "antilinkick", "autostatus", "autoreact",
  "autogreet", "autotyping", "autoread", "block", "unblock",
  "shutdown", "restart", "setbio", "setname", "setpp", "save",
  "join", "delaymsg", "del", "reactch", "kickall", "antibug",
  "leave", "open", "close", "tagadmin", "hidetag", "listactive",
  "changename", "closetime", "warn", "promote", "demote",
  "promoteall", "demoteall", "say", "cpp", "harami", "ghostping",
  "adminkill", "autorecording"
];

const autoCommands = [
  "antilink", "antilinkick", "antidelete", "autostatus", 
  "autoreact", "autogreet", "autotyping", "autorecording", "autoread"
];

// ===============================
// 📂 Load menu.js - Same folder se
// ===============================
const menuData = {};
let channelInfo = {};
try {
  const menuPath = path.join(__dirname, "menu.js");
  const loaded = require(menuPath);
  Object.assign(menuData, loaded);
  channelInfo = loaded.channelInfo || {
    newsletterJid: "0029VbE5Hc53wtb1OeF8h01y@newsletter",
    newsletterName: "REHMAN-MD 💐",
    channelLink: "https://whatsapp.com/channel/0029VbE5Hc53wtb1OeF8h01y",
    thumbnail: localThumbPath
  };
  if (channelInfo.thumbnail && channelInfo.thumbnail.includes("ibb.co")) {
    channelInfo.thumbnail = localThumbPath;
  }
} catch (err) {
  console.error("❌ Error loading menu.js:", err.message);
  channelInfo = {
    newsletterJid: "0029VbE5Hc53wtb1OeF8h01y@newsletter",
    newsletterName: "REHMAN-MD 💐",
    channelLink: "https://whatsapp.com/channel/0029VbE5Hc53wtb1OeF8h01y",
    thumbnail: localThumbPath
  };
}

let core;
try {
  const corePath = path.join(__dirname, "core.js");
  if (fs.existsSync(corePath)) core = require(corePath);
} catch (err) {}

let toggleAntidelete = null;
try {
  let antiPath = path.join(__dirname, "antidelete.js");
  if (fs.existsSync(antiPath)) {
    const mod = require(antiPath);
    toggleAntidelete = mod.toggleAntidelete || mod.run || mod;
  }
} catch (e) {}

// ===============================
// 🔹 MAIN COMMAND HANDLER - SETTING.JS WALA REPLY
// ===============================
async function handleCommand(conn, msg) {
  const text =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    msg.message?.imageMessage?.caption ||
    msg.message?.videoMessage?.caption ||
    "";
  if (!text.startsWith(".")) return;

  const parts = text.trim().split(/ +/);
  const command = parts[0].slice(1).toLowerCase();
  const args = parts.slice(1);
  const chatId = msg.key.remoteJid;
  const isGroup = chatId.endsWith("@g.us");
  const senderId = msg.key.fromMe ? conn.user.id.split(":")[0] + "@s.whatsapp.net" : msg.key.participant || msg.key.remoteJid;
  const senderNum = senderId.replace(/\D/g, "");
  const botNum = (conn.user.id || "").replace(/\D/g, "");
  const isOwner = senderNum.slice(0, 10) === botNum.slice(0, 10);
  const isDev = senderNum.includes("9234");
  const reply = (text) => conn.sendMessage(chatId, { text }, { quoted: msg });

  if (command === "self") {
    if (!isOwner && !isDev) return reply(ownerDeadReply);
    global.mode = "self";
    return reply("🔒 BOT IS NOW IN *SELF MODE*");
  }
  if (command === "public") {
    if (!isOwner && !isDev) return reply(ownerDeadReply);
    global.mode = "public";
    return reply("🌍 BOT IS NOW IN *PUBLIC MODE*");
  }

  if (isDev) return runCommand({ conn, msg, args, command, chatId, isGroup, senderNum, reply });

  if (global.mode === "self" && !isOwner && !["menu", "ownermenu", "downloadmenu", "groupmenu", "automenu", "aimenu", "utilitymenu", "repo", "idcheck"].includes(command)) {
    return; // self mode me ignore
  }

  if (global.mode === "public" && ownerOnlyCommands.includes(command) && !isOwner) {
    return reply(ownerDeadReply);
  }

  return runCommand({ conn, msg, args, command, chatId, isGroup, senderNum, reply });
}

// ===============================
// 🔹 COMMAND EXECUTOR
// ===============================
async function runCommand({ conn, msg, args, command, chatId, isGroup, senderNum, reply }) {
  try {
    if (command === "idcheck") {
      const botId = conn.user.id || "";
      return reply(`🤖 *Bot ID:* ${botId}\n📤 *Sender JID:* ${msg.key.participant || msg.key.remoteJid}\n🔢 *Sender Clean:* ${senderNum}`);
    }

    if (menuData[command]) {
      const menuText = menuData[command];
      if (command.includes("menu")) {
        try {
          const imageContent = localThumb ? localThumb : (fs.existsSync(channelInfo.thumbnail) ? fs.readFileSync(channelInfo.thumbnail) : null);
          if (imageContent) {
            return await conn.sendMessage(chatId, {
              image: imageContent,
              caption: menuText,
              contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: channelInfo.newsletterJid,
                  newsletterName: channelInfo.newsletterName,
                  serverMessageId: 1
                },
                externalAdReply: {
                  title: "REHMAN-MD 💐",
                  body: "Official Bot Menu",
                  thumbnail: global.thumbBuffer || localThumb,
                  mediaType: 1,
                  sourceUrl: channelInfo.channelLink
                }
              }
            }, { quoted: msg });
          }
        } catch (e) {
          console.log("Thumb send fail:", e.message);
        }
        const menuMessage = generateWAMessageFromContent(chatId, {
          extendedTextMessage: {
            text: menuText,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: channelInfo.newsletterJid,
                newsletterName: channelInfo.newsletterName,
                serverMessageId: 1
              }
            }
          }
        }, { userJid: chatId });
        return await conn.relayMessage(chatId, menuMessage.message, { messageId: menuMessage.key.id });
      }
      const menuMessage = generateWAMessageFromContent(chatId, { extendedTextMessage: { text: menuText } }, { userJid: chatId });
      return await conn.relayMessage(chatId, menuMessage.message, { messageId: menuMessage.key.id });
    }

    if (command === "antidelete" && toggleAntidelete) {
      return toggleAntidelete({ conn, m: msg, args, reply, jid: chatId });
    }

    if (core && core[command] && typeof core[command] === "function") {
      return await core[command]({ conn, m: msg, args, command, jid: chatId, isGroup, sender: senderNum, reply });
    }

    if (autoCommands.includes(command)) {
      const filePath = path.join(__dirname, `${command}.js`);
      if (fs.existsSync(filePath)) {
        const commandFile = require(filePath);
        if (typeof commandFile === "function") {
          return await commandFile({ conn, m: msg, args, command, jid: chatId, isGroup, sender: senderNum, reply });
        }
        if (typeof commandFile.run === "function") {
          return await commandFile.run({ conn, m: msg, args, command, jid: chatId, isGroup, sender: senderNum, reply });
        }
      } else {
        return reply(`⚙️ *${command}.js* file nahi mili!`);
      }
    }

    return reply("*ᴜɴᴋɴᴏᴡɴ ᴄᴏᴍᴍᴀɴᴅ! ᴛʀʏ `.ᴍᴇɴᴜ`*");
  } catch (err) {
    console.error("⚠️ Error:", err);
    return reply("⚠️ Error in command execution!");
  }
}

module.exports = { handleCommand };