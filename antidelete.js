// 📁 File: antidelete.js
module.exports = async function antidelete({ conn, m, args, reply }) {
  const jid = m.key.remoteJid;
  global.antidelete = global.antidelete || {};
  if (!jid.endsWith("@g.us")) return reply(`〔 🚫 *GROUP ONLY* 〕\n┃ ⚠️ This command only works \n┃ inside groups.\n╰━━━━━━━━━━━━━━━━━━━╯`);
  const current = global.antidelete[jid] === true;
  const mode = (args[0] || "").toLowerCase();
  if (mode === "on") {
    global.antidelete[jid] = true;
    global.ANTIDELETE = true;
    return reply(`〔 ✅ *ANTIDELETE ENABLED* 〕\n┃ 🗑️ Deleted messages will \n┃     be recovered now.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━╯`);
  }
  if (mode === "off") {
    delete global.antidelete[jid];
    return reply(`〔 ❌ *ANTIDELETE DISABLED* 〕\n┃ 🗑️ No more recovery.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const status = current ? "🟢 ENABLED" : "🔴 DISABLED";
  reply(`〔 📢 *ANTIDELETE STATUS* 〕\n┃ Current: ${status}\n┃ \n┃ ⚙️ Usage:\n┃   .antidelete on\n┃   .antidelete off\n╰━━━━━━━━━━━━━━━━━━━╯`);
};
module.exports.toggleAntidelete = module.exports;
module.exports.run = module.exports;