const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announcement")
    .setDescription("Sends an announcement to a specific channel.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Please enter the announcement.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const announcement = interaction.options.getString("message");

    const embed = new MessageEmbed()
      .setAuthor({
        name: "Gwiazdka Bot",
      })
      .setDescription(announcement)
      .setTimestamp();

    if (interaction.member.roles.cache.some((role) => role.name === "Admin")) {
      interaction.client.channels.cache
        .get(process.env.ANNOUNCEMENT_CHANNEL_ID)
        .send({ embeds: [embed] });
      interaction.reply({ content: "Announcement sent", ephemeral: true });
    } else {
      await interaction.reply({
        content: "You do not have the permissions to use this command.",
        ephemeral: true,
      });
    }
  },
};
