import { Router } from "express";
import users, { Users } from "../../database/users";
import { validateUser } from "../../modules/middleware";
import axios from "axios";
import { config } from "dotenv";
import sendReport from "../../modules/sendReport";
config();
const router = Router();

router.get("/profile", validateUser, async (req, res) => {
  res.render("pages/profile", {
    user: req.user,
    signedInUser: req.user,
  });
});
router.get('/profile/:requestedUser', validateUser, async (req, res) => { 
  const { requestedUser } = req.params;
  if (!requestedUser)
    return res.render("pages/404", {
      reason: "Please supply a user ID, You can not input your own userId",
    });
  
  const User = await users.findOne({ userId: requestedUser });
  if (!User) return res.render("pages/404", {
    reason: "Please supply a user ID",
  });
   
   res.render("pages/profile", {
     user: User,
     signedInUser: req.user,
   });
})

router.get("/block", validateUser, async (req, res) => {
  const { userId } = req.query;
  const User = await users.findOne({ userId: userId });
  //@ts-ignore
  if (!User || !userId || req.user.userId === userId)
    return res.render("pages/404", {
      reason: "Please supply a user ID, You can not input your own userId",
    });
  await users.findOneAndUpdate(
    //@ts-ignore
    { userId: req.user.userId },
    {
      $push: {
        blockedUserIds: [User.BasicInformation.userId],
      },
    }
  );
  res.render("pages/blocked", {
    signedInUser: req.user,
    blockedUser: User.BasicInformation,
  });
});

router.get("/report", validateUser, async (req, res) => {
  const { userId } = req.query;
  const User = await users.findOne({ userId: userId });
  //@ts-ignore
  if (!User || !userId || req.user.userId === userId)
    return res.render("pages/404", {
      reason: "Please supply a user ID, You can not input your own userId",
    });
  const request = await sendReport(req.user as Users, userId as string);
  if (!request)
    return res.render("pages/404", {
      reason: "Please supply a user ID, You can not input your own userId",
    });
  res.render("pages/reported", {
    signedInUser: req.user,
    reportedUser: User.BasicInformation,
  });
});
export default router;
