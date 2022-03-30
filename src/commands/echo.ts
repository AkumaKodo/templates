import {
  ApplicationCommandOptionTypes,
  type DiscordenoInteraction,
} from "https://deno.land/x/discordeno@13.0.0-rc18/mod.ts";
import { Bot} from "../../mod.ts";

Bot.container.utils.createCommand(Bot, {
  // The command name
  trigger: "echo",
  // The command description
  description: "Copy the message to the channel",
  // The scope - sets the slash command to global or guild only
  scope: "Development",
  // command params
  options: [{
    name: "message",
    type: ApplicationCommandOptionTypes.String,
    description: "The message to echo",
    required: true,
  }],
  // If the command should only be ran in the dev server
  devOnly: true,
  // If only the bot owners can run this command
  ownerOnly: true,
  // Command callback to run when called
  run: async (interaction: DiscordenoInteraction) => {
    const context = interaction.data?.options?.find((option) => option.name === "message");

    return await Bot.container.utils.createCommandReply(
      Bot,
      interaction,
      {
        embeds: [
          Bot.container.utils.embed().setColor("random").setDescription(
            `${context?.value}`,
          ),
        ],
      },
      false,
    );
  },
});
