// 📁 File: antilinkick.js
module.exports = async function antilinkick({ conn, m, args, reply }) {
  const jid = m.key.remoteJid;
  global.antilinkick = global.antilinkick || {};
  if (!jid.endsWith("@g.us")) return reply(`〔 🚫 *GROUP ONLY* 〕\n┃ ⚠️ This command only works \n┃ inside groups.\n╰━━━━━━━━━━━━━━━━━━━╯`);
  const current = global.antilinkick[jid] === true;
  const mode = (args[0] || "").toLowerCase();
  if (mode === "on") {
    global.antilinkick[jid] = true;
    return reply(`〔 ✅ *ANTILINKICK ENABLED* 〕\n┃ 🪼 Link sender will be \n┃     kicked automatically.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━╯`);
  }
  if (mode === "off") {
    delete global.antilinkick[jid];
    return reply(`〔 ❌ *ANTILINKICK DISABLED* 〕\n┃ 🪼 No more kick on link.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const status = current ? "🟢 ENABLED" : "🔴 DISABLED";
  reply(`〔 📢 *ANTILINKICK STATUS* 〕\n┃ Current: ${status}\n┃ \n┃ ⚙️ Usage:\n┃   .antilinkick on\n┃   .antilinkick off\n╰━━━━━━━━━━━━━━━━━━━╯`);
};