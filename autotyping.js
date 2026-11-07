// 📁 File: autotyping.js
module.exports = async function autotyping({ conn, m, args, reply }) {
  global.autotyping = global.autotyping || false;
  const mode = (args[0] || "").toLowerCase();
  if (mode === "on") {
    global.autotyping = true;
    return reply(`〔 ✅ *AUTOTYPING ENABLED* 〕\n┃ ⌨️ Bot will show typing \n┃     automatically.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━╯`);
  }
  if (mode === "off") {
    global.autotyping = false;
    return reply(`〔 ❌ *AUTOTYPING DISABLED* 〕\n┃ ⌨️ Typing stopped.\n┃ \n┃ 💐 Powered by: REHMAN-MD\n╰━━━━━━━━━━━━━━━━━━━╯`);
  }
  const status = global.autotyping ? "🟢 ENABLED" : "🔴 DISABLED";
  reply(`〔 📢 *AUTOTYPING STATUS* 〕\n┃ Current: ${status}\n┃ \n┃ ⚙️ Usage:\n┃   .autotyping on\n┃   .autotyping off\n╰━━━━━━━━━━━━━━━━━━━╯`);
};