import { snowflakeToTimestamp } from "https://deno.land/x/akumakodo@0.1.0/core/lib/utils/helpers.ts";
import { Bot } from "../../mod.ts";

Bot.container.utils.createCommand(Bot, {
  // The command name
  trigger: "ping",
  // The command description
  description: "Ping me!",
  // The scope - sets the slash command to global or guild only
  scope: "Development",
  // Limiters for command usage.
  rateLimit: {
    duration: 8000,
    limit: 1,
  },
  devOnly: true,
  // Command callback to run when called
  run: async (interaction) => {
    const myBtn = Bot.container.utils.createCommandButton(Bot, "Pong!", {
      setStyle: "Success",
      setLink: "https://api.github.com"
    });

    return await Bot.container.utils.createCommandReply(
      Bot,
      interaction,
      {
        embeds: [
          Bot.container.utils.embed().setColor("random").setDescription(
            `🏓Pong! ${Date.now() - snowflakeToTimestamp(interaction.id)}`,
          ),
        ],
        components: myBtn,
      },
      false,
    );
  },
});
