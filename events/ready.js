const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { MessageEmbed } = require("discord.js");
var CronJob = require("cron").CronJob;

require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,
  execute(client, commands) {
    console.log(`Logged in as ${client.user.tag}!`);

    var job = new CronJob(
      "0 0 18 * * *", // 6pm
      function () {
        console.log("Cron job running");

        const embed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Daily Check-in")
          .addFields(
            { name: "\u200B", value: "1. Did you take your meds?" },
            {
              name: "\u200B",
              value: "2. Did you chat to a loved one today? ",
            },
            {
              name: "\u200B",
              value:
                "3. Rate your physical pain /10 (1 being no pain, 10 being EXTREME pain)",
            },
            {
              name: "\u200B",
              value:
                "4. Rate your mental pain/distress /10 (1 being no pain, 10 being EXTREME pain)",
            },
            {
              name: "\u200B",
              value: "5. Did you exercise or go for a walk today? ",
            },
            {
              name: "\u200B",
              value: "6. Did you drink any water today?",
            },
            {
              name: "\u200B",
              value: "7. Did you eat anything today?",
            },
            {
              name: "\u200B",
              value: "8. What's one thing you're thankful for today?",
            },
            {
              name: "\u200B",
              value: "9. Did you do anything fun today? What did you do? ",
            },
            {
              name: "\u200B",
              value: "10. Did you brush your teeth? Have a shower?",
            }
          )
          .setTimestamp()
          .setAuthor({
            name: "Gwiazdka Bot",
          });

        client.channels.cache
          .get(process.env.DAILY_CHANNEL_ID)
          .send({ embeds: [embed] });

        client.channels.cache
          .get(process.env.DAILY_CHANNEL_ID)
          .send(`<@&${process.env.ROLE_ID}> Daily Check-in`);
      },
      null,
      true,
      "Europe/Dublin"
    );

    client.user.setPresence({
      activities: [{ name: "with Gwiazdka" }],
      status: "online",
    });

    const CLIENT_ID = client.user.id;
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

    (async () => {
      try {
        if (process.env.ENV === "production") {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
          });
          console.log("Global Commands Successfully Registered.");
        } else {
          await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
            {
              body: commands,
            }
          );
          console.log("Guild Commands Successfully Registered.");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  },
};
