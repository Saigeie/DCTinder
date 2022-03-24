import express from "express";
import { config } from "dotenv"; import passport from "passport";
import discordStrat from "./stratages/discord"
import session from "express-session"
import cors from "cors"
import Mongo from "./database/connect"
import store from "connect-mongo"
import cookies from "cookies"
import Routes from "./routes/index"
import bodyParser from "body-parser";
import methodOverride from "method-override"
import ejs from "ejs"
import DashBoardRoutes from "./routes/Dashboard"
import SettingRoute from "./routes/Dashboard/setting";
import CommonRoutes from "./routes/Common"
import userIds from "./database/userIds"
discordStrat()
config();
Mongo()

const app = express();
app.use(cors({origin: ["http://localhost:3000"], credentials: true}))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 * 12 },
    store: store.create({mongoUrl: process.env.DB})
  })
);
app.use(cookies.express("a", "b", "c"));
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(process.cwd() + "/src/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", process.cwd() + "/src/views")
app.set("view engine", "ejs")
Routes(app);

app.get("/auth/redirect", passport.authenticate("discord"), (req, res) => {
    setTimeout(() => {
       res.redirect(process.env.DEFAULT_URL);
    }, 500);
})
app.use("/", CommonRoutes, SettingRoute, DashBoardRoutes)

app.listen(process.env.PORT || 3001, async () => {
  const UserIds = await userIds.findOne({ key: `${process.env.KEY}` })
  if(!UserIds) await userIds.create({key: `${process.env.KEY}`})
  console.log(`Server online, http://localhost:${process.env.PORT || 3001}`)
})