const fs = require("fs");
const P = require("pino");
const express = require("express");
const path = require("path");
const { 
  default: makeWASocket, 
  useMultiFileAuthState, 
  fetchLatestBaileysVersion, 
  DisconnectReason 
} = require("@whiskeysockets/baileys");

const { handleCommand } = require("./menu/case");
const { loadSettings } = require("./settings");
const { storeMessage, handleMessageRevocation } = require("./antidelete");
const AntiLinkKick = require("./antilinkick.js");
const { antibugHandler } = require("./antibug.js");

const app = express();
const PORT = process.env.PORT || 3000;
let pairingCode = null;
let isConnected = false;
let globalSock = null;

// 🔐 REMOTE PAIR CODE
const REMOTE_PAIR_CODE = "REHMANMD";

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/status", (req, res) => {
  res.json({ connected: isConnected, pairingCode });
});

app.get("/pair", async (req, res) => {
  const number = req.query.number?.replace(/[^0-9]/g, "");
  const code = req.query.code?.toUpperCase();
  if (!number) return res.json({ error: "Number do!" });
  if (code && code !== REMOTE_PAIR_CODE) return res.json({ error: `Code galat! Sahi: ${REMOTE_PAIR_CODE}` });
  try {
    if (globalSock && !globalSock.authState.creds.registered) {
      pairingCode = await globalSock.requestPairingCode(number);
      res.json({ success: true, code: pairingCode, number });
    } else {
      res.json({ error: "Bot already paired hai" });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`🌐 REHMAN-MD Website: http://localhost:${PORT}`));

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({ version, auth: state, logger: P({ level: "fatal" }) });
  globalSock = sock;

  const settings = typeof loadSettings === 'function' ? loadSettings() : {};
  let ownerRaw = settings.ownerNumber?.[0] || "92370XXXXXXX";
  const ownerJid = ownerRaw.includes("@s.whatsapp.net") ? ownerRaw : ownerRaw + "@s.whatsapp.net";

  global.sock = sock;
  global.settings = settings;
  global.signature = "> 𝙍𝙀𝙃𝙈𝘼𝙉-𝙈𝘿 💐";
  global.owner = ownerJid;
  global.ownerNumber = ownerRaw;

  global.antilink = {};
  global.antilinkick = {};
  global.antibug = false;
  global.autogreet = {};
  global.autotyping = false;
  global.autoreact = false;
  global.autostatus = false;

  console.log("✅ BOT OWNER:", global.owner);

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "open") {
      isConnected = true;
      pairingCode = null;
      console.log("✅ [REHMAN-MD ONLINE] Railway par Connected!");
    }
    if (connection === "close") {
      isConnected = false;
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startBot();
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const isOwnerMsg = (msg.key.participant || msg.key.remoteJid).includes(global.ownerNumber) || msg.key.fromMe;

    // ✅ .pair command - Remote Pair System WhatsApp ke andar
    if (text.startsWith(".pair")) {
      const args = text.trim().split(/ +/);
      const num = args[1]?.replace(/[^0-9]/g, "");
      const rcode = args[2]?.toUpperCase();

      if (!num) {
        await sock.sendMessage(jid, { text: `🔐 *REHMAN-MD REMOTE PAIR*\n\nUse: .pair 923XXXXXXXXX ${REMOTE_PAIR_CODE}\n\nYa website par jao: Railway Link` }, { quoted: msg });
        return;
      }
      if (rcode && rcode !== REMOTE_PAIR_CODE) {
        await sock.sendMessage(jid, { text: `❌ Galat Remote Code! Sahi Code: ${REMOTE_PAIR_CODE}` }, { quoted: msg });
        return;
      }

      try {
        // Agar bot already connected hai to new sock se remote pair nikalo
        const { state: tempState } = await useMultiFileAuthState("temp_auth");
        const tempSock = makeWASocket({ version, auth: tempState, logger: P({ level: "fatal" }) });
        const code = await tempSock.requestPairingCode(num);
        await sock.sendMessage(jid, { text: `✅ *REMOTE PAIR CODE*\n\n📱 Number: ${num}\n🔑 Code: *${code}*\n\n⏳ 60 sec valid\nWhatsApp > Linked Devices > Link with phone number` }, { quoted: msg });
      } catch (e) {
        await sock.sendMessage(jid, { text: `❌ Pair failed: ${e.message}` }, { quoted: msg });
      }
      return;
    }

    if (settings.ANTIDELETE === true) {
      try {
        if (msg.message) storeMessage(msg);
        if (msg.message?.protocolMessage?.type === 0) {
          await handleMessageRevocation(sock, msg);
          return;
        }
      } catch {}
    }

    if (global.autotyping && jid !== "status@broadcast") {
      try { await sock.sendPresenceUpdate('composing', jid); } catch {}
    }

    // ✅ AutoReact 30+ reacts
    if (global.autoreact && jid !== "status@broadcast") {
      try {
        const reacts = ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","❤️‍🔥","💞","💓","💗","💖","💝","💘","😍","😘","🥰","😎","🤩","🥳","😂","🤣","😭","🥺","😈","👑","🔥","💐","⚡","✨","💯","🫶","🙏","😇","🌸","🦋","🎉"];
        const r = reacts[Math.floor(Math.random() * reacts.length)];
        await sock.sendMessage(jid, { react: { text: r, key: msg.key } });
      } catch {}
    }

    if (global.autostatus && jid === "status@broadcast") {
      try { await sock.readMessages([{ remoteJid: jid, id: msg.key.id, participant: msg.key.participant }]); } catch {}
      return;
    }

    if (jid.endsWith("@g.us") && global.antilink[jid] && /(chat\.whatsapp\.com|t\.me|discord\.gg|wa\.me|bit\.ly|youtu\.be|https?:\/\/)/i.test(text) && !msg.key.fromMe) {
      try { await sock.sendMessage(jid, { delete: { remoteJid: jid, fromMe: false, id: msg.key.id, participant: msg.key.participant } }); } catch {}
    }

    if (jid.endsWith("@g.us") && global.antilinkick[jid] && /(chat\.whatsapp\.com|t\.me|discord\.gg|wa\.me|bit\.ly|youtu\.be|https?:\/\/)/i.test(text) && !msg.key.fromMe) {
      try { await AntiLinkKick.checkAntilinkKick({ conn: sock, m: msg }); } catch {}
    }

    if (global.antibug && !msg.key.fromMe) {
      try { const isBug = await antibugHandler({ conn: sock, m: msg }); if (isBug) return; } catch {}
    }

    try { await handleCommand(sock, msg, {}); } catch {}
  });

  // AutoGreet REHMAN-MD
  sock.ev.on("group-participants.update", async (update) => {
    const { id, participants, action } = update;
    if (!global.autogreet?.[id]) return;
    try {
      const metadata = await sock.groupMetadata(id);
      const memberCount = metadata.participants.length;
      const groupName = metadata.subject;
      for (const user of participants) {
        const tag = `@${user.split("@")[0]}`;
        let message = action === "add" ? `💐 *REHMAN-MD* 💐\n\n👋 Hey ${tag} Welcome to ${groupName}\nMembers: ${memberCount}` : `💔 ${tag} left ${groupName}`;
        await sock.sendMessage(id, { text: message, mentions: [user] });
      }
    } catch {}
  });
}

startBot();