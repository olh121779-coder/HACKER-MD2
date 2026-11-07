// 📁 File: autorecording.js
module.exports = async function autorecording({ conn, m, args, reply }) {
  global.autorecording = global.autorecording || false;
  const mode = (args[0] || "").toLowerCase();
  if (mode === "on") {
    global.autorecording = true;
    return reply(`〔 ✅ *AUTORECORDING ENABLED* 〕\n┃ 🎙️ Bot will show recording \n┃     automatically.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━╯`);
  }
  if (mode === "off") {
    global.autorecording = false;
    return reply(`〔 ❌ *AUTORECORDING DISABLED* 〕\n┃ 🎙️ Recording stopped.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const status = global.autorecording ? "🟢 ENABLED" : "🔴 DISABLED";
  reply(`〔 📢 *AUTORECORDING STATUS* 〕\n┃ Current: ${status}\n┃ \n┃ ⚙️ Usage:\n┃   .autorecording on\n┃   .autorecording off\n╰━━━━━━━━━━━━━━━━━━━╯`);
};