import { MessageEmbed, WebhookClient } from "discord.js"
import { config } from "dotenv"
import User, { Users } from "../database/users";
config()
const webHook = new WebhookClient({
  id: `${process.env.WEBHOOK_ID}`,
  url: `${process.env.WEBHOOK_URL}`,
});

const sendReport = async (Reporter: Users, Reported: string) => {
    const ReportedUser = await User.findOne({ userId: Reported }) as Users
    if (!ReportedUser) { return false; }
    const embed = new MessageEmbed()
      .setTitle(`User's Profile has been reported.`)
      .addFields(
        {
          name: `Reporter`,
          //@ts-ignore
          value: `${Reporter.BasicInformation.username} | \`${Reporter.userId}\``,
        },
        {
          name: `Reported User`,
          //@ts-ignore
          value: `${ReportedUser.BasicInformation.username} | [\`${ReportedUser.userId}\`](${process.env.WEB_URL}/profile/${ReportedUser.userId})`,
        }
      )
      .setColor(`#3f00e6`);
    
    webHook.send({ embeds: [embed] })
    return true;

}

export default sendReport