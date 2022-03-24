import { Router } from "express";
import users, { Users } from "../../database/users";
import { validateUser } from "../../modules/middleware";
import { config } from "dotenv";
import sendReport from "../../modules/sendReport";
// import { Search } from "../../modules/searchSystem";
config();
const router = Router();

router.get("/profile", validateUser, async (req, res) => {
  //@ts-ignore
  const alreadyMatched = await users.findOne({ userId: req.user.userId });
  res.render("pages/profile", {
    user: req.user,
    signedInUser: req.user,
    matched: false,
  });
});

// router.get("/search", validateUser, async (req, res) => {
//   const search = await Search(req.user as Users)
//   res.redirect(`${search}`)
// })

router.get('/profile/:requestedUser', validateUser, async (req, res) => {
  const { requestedUser } = req.params;
  const { random } = req.query;
  if (!requestedUser)
    return res.render("pages/404", {
      header: `Supply a user ID`,
      reason: "Please supply a user ID, You can not input your own userId",
    });
  //@ts-ignore
  // const BaseUser = await users.findOne({ userId: req.user.userId });
  // if (BaseUser.blockedUserIds.includes(requestedUser) && random === "true") {
  //     const search = await Search(req.user as Users)
  //    return res.redirect(`${search}`)
  // }
  const User = await users.findOne({ userId: requestedUser });
  if (!User)
    return res.render("pages/404", {
      header: `Supply a user ID`,
      reason: "Please supply a user ID",
    });
  //@ts-ignore
  const alreadyMatched = await users.findOne({ userId: req.user.userId });
  let matched;
  if(alreadyMatched.matchedUsers.includes(User.userId)) { matched = true } else { matched = false }
  res.render("pages/profile", {
    user: User,
    signedInUser: req.user,
    matched: matched
  });
})

router.get("/block", validateUser, async (req, res) => {
  const { userId } = req.query;
  const User = await users.findOne({ userId: userId });
  //@ts-ignore
  if (!User || !userId || req.user.userId === userId)
    return res.render("pages/404", {
      header: `Supply a user ID`,
      reason: "Please supply a user ID, You can not input your own userId",
    });
  //@ts-ignore
  const requestedUser = await users.findOne({ userId: req.user.userId })
  if (requestedUser.blockedUserIds.includes(`${userId}`))
    return res.render("pages/404", {
      header: `User is already blocked`,
      reason: "This user is already blocked.",
    });
    await users.findOneAndUpdate(
      //@ts-ignore
      { userId: req.user.userId },
      {
        $push: {
          blockedUserIds: User.userId,
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
