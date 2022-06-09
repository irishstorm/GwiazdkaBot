/*
    Name : Gwiazdka Bot
    Description : This is a helper bot created for the server Gwiazdka.
    Author: irishstorm#2799
    Date: 09/07/2022
*/

import Discord, { Intents, TextChannel, MessageEmbed } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

//  Intents
const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  //  Sets the bots status and activities
  client.user.setPresence({
    activities: [{ name: "with Gwiazdka" }],
    status: "idle",
  });

  const guildID = "753300601001214063";
  const guild = client.guilds.cache.get(guildID);

  //client.application.commands.set([]);
  //guild.commands.set([]);

  let commands = guild.commands;

  commands?.create({
    name: "announcement",
    description: "Sends a announcement to specific channel",
    options: [
      {
        name: "message",
        description: "Please enter the announcement.",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName, options } = interaction;

  switch (commandName) {
    case "announcement":
      const announcement = options.getString("message");
      const channelId = "756028306494717973";

      const embed = new MessageEmbed()
        .setAuthor({
          name: "Gwiazdka Bot",
        })
        .setDescription(announcement)
        .setTimestamp();

      if (
        interaction.member.roles.cache.some((role) => role.name === "Admin")
      ) {
        client.channels.cache.get(channelId).send({ embeds: [embed] });
        interaction.reply({ content: "Announcement sent", ephemeral: true });
      } else {
        await interaction.reply({
          content: "You do not have the permissions to use this command.",
          ephemeral: true,
        });
      }
      break;

    default:
      break;
  }
});

client.login(process.env.TOKEN);
