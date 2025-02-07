const { MessageEmbed, Message, WebhookClient } = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "messageDelete",
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    const Log = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Message Deleted")
      .setDescription(
        `${message.author} deleted a message in ${
          message.channel
        }\n **Message** : ${
          message.content ? message.content : "Message could not be found."
        }`.slice(0, 4096)
      )
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setAuthor({
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL(),
      });

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
