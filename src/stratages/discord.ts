import passport from "passport"
import { Strategy } from "passport-discord"
import { config } from "dotenv";
import User, { Users } from "../database/users"
import userIds from "../database/userIds";
config();

passport.serializeUser((user: Users, done) => {
  return done(null, user.userId)
})
passport.deserializeUser( async (id, done) => {
    const user = await User.findOne({userId: id})
    return user ? done(null , user) : done(null, null)
});

const strat = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: ["identify", "guilds"],
      },
      async function (accessToken, refreshToken, profile, done) {
        let UserInfo = await User.findOne({ userId: profile.id })
        if (UserInfo) {
          await User.findOneAndUpdate(
            { userId: profile.id },
            {
              userId: profile.id,
              BasicInformation: {
                username: profile.username,
                discriminator: profile.discriminator,
                profilePicture: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=1024`,
              },
            }
          );
           return done(null, UserInfo as Users);
        }
        await userIds.findOneAndUpdate(
          { key: `${process.env.KEY}` },
          {
            $push: {
              userIds: `${profile.id}`,
            },
          }
        );
        const NewUser = await User.create({
          userId: profile.id,
          bio: `We do not know much about this user yet but all we know is that they are very hot 😉`,
          BasicInformation: {
            username: profile.username,
            discriminator: profile.discriminator,
            profilePicture: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=1024`,
          },
        });
        return done(null, NewUser as Users)
      }
    )
  );
}

export default strat;