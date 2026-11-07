// 📁 File: autogreet.js - Aapka diya hua structure same
module.exports = async function greet({ conn, m, args, reply }) {
  const jid = m.key.remoteJid;
  global.autogreet = global.autogreet || {};
  if (!jid.endsWith("@g.us")) {
    return reply(`〔 🚫 *GROUP ONLY* 〕\n┃ ⚠️ This command only works \n┃ inside groups.\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const current = global.autogreet[jid] === true;
  const mode = (args[0] || "").toLowerCase();
  if (mode === "on") {
    global.autogreet[jid] = true;
    return reply(`〔 ✅ *AUTO-GREET ENABLED* 〕\n┃ 📡 New join/leave messages \n┃     will now be sent.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━╯`);
  }
  if (mode === "off") {
    delete global.autogreet[jid];
    return reply(`〔 ❌ *AUTO-GREET DISABLED* 〕\n┃ 🧟 No more join/leave greetings.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const status = current ? "🟢 ENABLED" : "🔴 DISABLED";
  reply(`〔 📢 *AUTO-GREET STATUS* 〕\n┃ Current: ${status}\n┃ \n┃ ⚙️ Usage:\n┃   .autogreet on   → Enable\n┃   .autogreet off  → Disable\n╰━━━━━━━━━━━━━━━━━━━╯`);
};