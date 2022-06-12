const { MessageEmbed, Message, WebhookClient } = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "messageDelete",
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    const Log = new MessageEmbed().setDescription(
      `A [message](${message.url}) by ${
        message.author.tag
      } was **deleted**.\n**Deleted Message**\n ${
        message.content ? message.content : "Message could not be found."
      }`.slice(0, 4096)
    );

    if (message.attachments.size >= 1) {
      Log.addField(
        "Attachments: ",
        `${message.attachments.map((a) => a.url)}`,
        true
      );
    }

    if (message.embeds.length >= 1) {
      Log.addField("Embeds: ", `${message.embeds.map((e) => e.url)}`, true);
    }

    if (message.author.avatarURL) {
      Log.setThumbnail(message.author.avatarURL);
    } else Log.setThumbnail(message.author.defaultAvatarURL);

    new WebhookClient({ url: process.env.WEBHOOKURL })
      .send({ embeds: [Log] })
      .catch((error) => console.log(error));
  },
};
