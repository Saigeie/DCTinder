import { Router } from "express";
import users, { Users } from "../../database/users";
import { validateUser } from "../../modules/middleware";
import axios from "axios";
import { config } from "dotenv";
config();
const router = Router();

router.get("/profile", validateUser, async (req, res) => {
  res.render("pages/profile", {
    user: req.user,
  });
});

router.get("/block", validateUser, async (req, res) => {
  const { userId } = req.query;
  const User = await users.findOne({ discordId: userId });
  //@ts-ignore
  if (!User || !userId || req.user.userId === userId)
    return res.render("pages/404", {
      reason: "Please supply a user ID, You can not input your own userId"
    });
  await users.findOneAndUpdate(
    //@ts-ignore
    { discordId: req.user.userId },
    {
      $push: {
        blockedUserIds: [User.BasicInformation.userId],
      },
    }
  );
  res.render("pages/blocked", {
    user: req.user,
    blockedUser: User.BasicInformation,
  });
});
export default router;
