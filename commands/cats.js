const { SlashCommandBuilder } = require("@discordjs/builders");
const { request } = require("undici");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cats")
    .setDescription("Sends a random cat picture"),
  async execute(interaction) {
    await interaction.deferReply();

    async function getJSONResponse(body) {
      let fullBody = "";

      for await (const data of body) {
        fullBody += data.toString();
      }

      return JSON.parse(fullBody);
    }

    const catResult = await request("https://aws.random.cat/meow").catch(
      (err) => {
        console.log(err);
      }
    );
    const { file } = await getJSONResponse(catResult.body).catch((err) => {
      console.log(err);
    });

    return await interaction.editReply({
      files: [{ attachment: file, name: "cat.png" }],
    });
  },
};
