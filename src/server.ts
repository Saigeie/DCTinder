import express from "express";
import { config } from "dotenv"; import passport from "passport";
import discordStrat from "./stratages/discord"
import session from "express-session"
import cors from "cors"
import Mongo from "./database/connect"
import store from "connect-mongo"
import cookies from "cookies"
import Routes from "./routes/index"
import ejs from "ejs"
import DashBoardRoutes from "./routes/Dashboard"
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
    cookie: { maxAge: 60000 * 60 * 24 },
    store: store.create({mongoUrl: process.env.DB})
  })
);
app.use(cookies.express("a", "b", "c"));
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(process.cwd() + "/src/views"));

app.set("views", process.cwd() + "/src/views")
app.set("view engine", "ejs")
Routes(app);

// Invite: https://discord.com/api/oauth2/authorize?client_id=955226778656440360&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code&scope=identify%20connections%20guilds

app.get("/auth/redirect", passport.authenticate("discord"), (req, res) => {
     res.redirect(process.env.DEFAULT_URL)
})
app.use("/", DashBoardRoutes)

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server online, http://localhost:${process.env.PORT || 3001}`)
})