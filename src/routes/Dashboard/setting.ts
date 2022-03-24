import { Router } from "express";
import users, { Users } from "../../database/users";
import { validateUser } from "../../modules/middleware";
import { config } from "dotenv";
config();
const router = Router();

router.get("/settings", validateUser, (req, res) => {
  res.render(`pages/settings`, {
    signedInUser: req.user,
  });
});

router.get("/settings/bio", validateUser, (req, res) => {
  res.render(`pages/settings/bio`, {
    signedInUser: req.user,
  });
});

router.put("/settings/bio", validateUser, async (req, res) => {
  const { bioChange } = req.body;
  //@ts-ignore
  if(bioChange === req.user.bio || bioChange === "" || bioChange === null || bioChange === undefined) return res.redirect('/profile')
  //@ts-ignore
  await users.findOneAndUpdate({ userId: req.user.userId }, {
    bio: bioChange
  });
  res.redirect("/profile")
});

router.get('/deleteaccount', async (req, res) => {
  //@ts-ignore
  const user = users.findOne({ userId: req.user.userId });
  if (!user)
    return res.render(`pages/401`, {
      header: `No User Found`,
      link: `/`,
      reason: `I could not find a user 🤔`,
    });
  //@ts-ignore
  await users.findOneAndRemove({ userId: req.user.userId });
  res.render("pages/sorryToSeeYouGo");
})

export default router;
