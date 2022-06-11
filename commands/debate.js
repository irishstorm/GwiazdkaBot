const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("debate")
    .setDescription("Sends an debate announcement to the debate channel.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Please enter the announcement.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const debate = interaction.options.getString("message");

    const embed = new MessageEmbed()
      .setAuthor({
        name: "Gwiazdka Bot",
      })
      .setDescription(debate)
      .setTimestamp();

    if (interaction.member.roles.cache.some((role) => role.name === "Admin")) {
      interaction.client.channels.cache
        .get(process.env.DEBATE_CHANNEL_ID)
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
