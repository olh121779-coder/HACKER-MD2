// 📁 File: autostatus.js
module.exports = async function autostatus({ conn, m, args, reply }) {
  global.autostatus = global.autostatus || false;
  const mode = (args[0] || "").toLowerCase();
  if (mode === "on") {
    global.autostatus = true;
    return reply(`〔 ✅ *AUTOSTATUS ENABLED* 〕\n┃ 👁️ Status will be viewed \n┃     automatically.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━╯`);
  }
  if (mode === "off") {
    global.autostatus = false;
    return reply(`〔 ❌ *AUTOSTATUS DISABLED* 〕\n┃ 👁️ Status view stopped.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const status = global.autostatus ? "🟢 ENABLED" : "🔴 DISABLED";
  reply(`〔 📢 *AUTOSTATUS STATUS* 〕\n┃ Current: ${status}\n┃ \n┃ ⚙️ Usage:\n┃   .autostatus on\n┃   .autostatus off\n╰━━━━━━━━━━━━━━━━━━━╯`);
};