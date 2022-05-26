import tml from "tmi.js";
import chalk from "chalk";
import dotenv from "dotenv";

const CHANNEL_NAME = "vanderfondi";

dotenv.config();

const client = new tml.Client({
  options: { debug: false },
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  channels: [CHANNEL_NAME],
});

client.connect();

client.on("connected", (address, port) => {
  client.action("vanderfondi", `Soy el bot de @vanderfondi, iniciando...`);
});

client.on("whisper", (from, userstate, message, self) => {
  if (self) return;
  console.log("SUSURRO de ${from} ", message);
});

client.on("message", (channel, userstate, message, self) => {
  if (self) return;

  const isAction = userstate["message-type"] === "action";
  if (isAction) return;

  const username = userstate?.username;
  const displayName = userstate["display-name"];
  const color = userstate?.color ?? "white";
  const nick = chalk.hex(color).underline(displayName);
  const suscriber = userstate?.subscriber;
  const mod = userstate?.mod;
  const isChat = userstate["message-type"] === "chat";
  const type = userstate["message-type"];

  const isPrime = userstate.badges?.premium;
  const isVip = userstate?.badges?.vip;
  const isMod = userstate?.badges?.mod;
  const isSub = userstate?.subscriber;

  const badgeinfo = userstate?.badges;
  const badges = isPrime
    ? "👑"
    : "" + isVip
    ? "🌟"
    : "" + isMod
    ? "🔧"
    : "" + isSub
    ? "🎖"
    : "";

  console.log(`[${badges}][${nick}] => ${message}`);
});
