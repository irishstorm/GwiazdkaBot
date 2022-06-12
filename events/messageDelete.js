const { MessageEmbed, Message, WebhookClient } = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "messageDelete",
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    const Log = new MessageEmbed()
      .setDescription(
        `A message by **${
          message.author.tag
        }** was **deleted**.\n**Deleted Message**\n ${
          message.content ? message.content : "Message could not be found."
        }`.slice(0, 4096)
      )
      .setThumbnail(message.author.displayAvatarURL());

    if (message.attachments.size >= 1) {
      Log.addField(
        "Attachments: ",
        `${message.attachments.map((a) => a.url)}`,
        true
      );
    }

    new WebhookClient({ url: process.env.WEBHOOKURL })
      .send({ embeds: [Log] })
      .catch((error) => console.log(error));
  },
};
