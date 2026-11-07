// 📁 File: autoreact.js
module.exports = async function autoreact({ conn, m, args, reply }) {
  global.autoreact = global.autoreact || false;
  const mode = (args[0] || "").toLowerCase();
  if (mode === "on") {
    global.autoreact = true;
    return reply(`〔 ✅ *AUTOREACT ENABLED* 〕\n┃ 💖 Bot will react on \n┃     every message now.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━╯`);
  }
  if (mode === "off") {
    global.autoreact = false;
    return reply(`〔 ❌ *AUTOREACT DISABLED* 〕\n┃ 💖 Auto react stopped.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const status = global.autoreact ? "🟢 ENABLED" : "🔴 DISABLED";
  reply(`〔 📢 *AUTOREACT STATUS* 〕\n┃ Current: ${status}\n┃ \n┃ ⚙️ Usage:\n┃   .autoreact on\n┃   .autoreact off\n╰━━━━━━━━━━━━━━━━━━━╯`);
};