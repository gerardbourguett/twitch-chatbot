const tmi = require("tmi.js");
dotenv.config();

const options = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  channels: ["vanderfondi"],
};

const client = new tmi.client(options);

client.connect();

client.on("connected", (address, port) => {
  client.action("vanderfondi", `Soy el bot de @vanderfondi, iniciando...`);
});
client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

client.on("chat", (target, ctx, message, self) => {
  if (self) return;
  const commandName = message.trim();
  if (
    commandName === "Oli" ||
    commandName === "oal" ||
    commandName === "Oal" ||
    commandName === "oli"
  ) {
    client.say(target, `Holi ${ctx.username}`);
  }

  if (commandName === "!dice") {
    const num = rollDice();
    client.say(target, `${ctx.username} rolled a ${num}`);
  }

  if (commandName === "!pancha") {
    const num = rollDice();
    client.say(
      target,
      "vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha vander42Pancha  "
    );
  }
});

function rollDice() {
  const sides = 100;
  const roll = Math.floor(Math.random() * sides) + 1;
}
