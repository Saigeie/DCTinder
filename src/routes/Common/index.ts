import { Router } from "express";
import { config } from "dotenv";
config();
const router = Router();

router.get("/", async (req, res) => {
    res.render("pages/home", {
        user: req.user || null
    })
});


export default router;
