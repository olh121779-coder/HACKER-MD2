// 📁 File: antilink.js - REHMAN-MD 💐
module.exports = async function antilink({ conn, m, args, reply }) {
  const jid = m.key.remoteJid;
  global.antilink = global.antilink || {};
  if (!jid.endsWith("@g.us")) {
    return reply(`〔 🚫 *GROUP ONLY* 〕\n┃ ⚠️ This command only works \n┃ inside groups.\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const current = global.antilink[jid] === true;
  const mode = (args[0] || "").toLowerCase();
  if (mode === "on") {
    global.antilink[jid] = true;
    return reply(`〔 ✅ *ANTILINK ENABLED* 〕\n┃ 🪼 Group links will be \n┃     auto deleted now.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━╯`);
  }
  if (mode === "off") {
    delete global.antilink[jid];
    return reply(`〔 ❌ *ANTILINK DISABLED* 〕\n┃ 🪼 Links allowed now.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const status = current ? "🟢 ENABLED" : "🔴 DISABLED";
  reply(`〔 📢 *ANTILINK STATUS* 〕\n┃ Current: ${status}\n┃ \n┃ ⚙️ Usage:\n┃   .antilink on   → Enable\n┃   .antilink off  → Disable\n╰━━━━━━━━━━━━━━━━━━━╯`);
};