import { dotEnvConfig } from "./deps.ts";
import { AkumaKodoBotCore } from "./deps.ts";

const env = dotEnvConfig({ export: true });
const TOKEN = env.DISCORD_BOT_TOKEN || "";

// These are type script so remember to convert to BigInt
const DEV_GUILD = env.DISCORD_DEV_GUILD || "";
const BOT_ID = env.DISCORD_BOT_ID || "";

// Bot configuration
const Bot = new AkumaKodoBotCore(
  {
    botId: BigInt(BOT_ID),
    events: {},
    intents: ["Guilds", "GuildMessages", "GuildMembers"],
    token: TOKEN,
  },
  {
    optional: {
      bot_development_server_id: BigInt(DEV_GUILD),
      bot_debug_mode: true,
      providers: {
        type: "disabled",
      },
      bot_internal_events: true
    },
  },
);

// Loads of folder paths
await Bot.container.fs.fastLoader(Bot, [
  "./src/commands",
]);

// Creates ws connection and starts listening
await Bot.createBot();

export { Bot };
