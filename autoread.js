// 📁 File: autoread.js
module.exports = async function autoread({ conn, m, args, reply }) {
  global.autoread = global.autoread || false;
  const mode = (args[0] || "").toLowerCase();
  if (mode === "on") {
    global.autoread = true;
    return reply(`〔 ✅ *AUTOREAD ENABLED* 〕\n┃ 👁️ All messages will be \n┃     marked as read.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━╯`);
  }
  if (mode === "off") {
    global.autoread = false;
    return reply(`〔 ❌ *AUTOREAD DISABLED* 〕\n┃ 👁️ Read stopped.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const status = global.autoread ? "🟢 ENABLED" : "🔴 DISABLED";
  reply(`〔 📢 *AUTOREAD STATUS* 〕\n┃ Current: ${status}\n┃ \n┃ ⚙️ Usage:\n┃   .autoread on\n┃   .autoread off\n╰━━━━━━━━━━━━━━━━━━━╯`);
};