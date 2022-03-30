import { Button, Components, snowflakeToTimestamp } from "../../deps.ts";
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
  // If the command should only be ran in the dev server
  devOnly: true,
  // Command callback to run when called
  run: async (interaction) => {

    const btn: Components = new Components().addComponent(
      new Button()
        .setLabel("Invite").setUrl("https://discord.com/oauth2/authorize?client_id=946398697254703174&permissions=8&scope=bot")
    )
    
    return await Bot.container.utils.createCommandReply(
      Bot,
      interaction,
      {
        embeds: [
          Bot.container.utils.embed().setColor("random").setDescription(
            `🏓Pong! ${Date.now() - snowflakeToTimestamp(interaction.id)}`,
          ),
        ],
        components: btn
      },
      false,
    );
  },
});
