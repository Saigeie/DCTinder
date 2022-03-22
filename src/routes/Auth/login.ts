import Route from "../../structures/Route"
import { config } from "dotenv";
config();

export const Route: Route = {
    route: "login",
    parentRoute: "auth",
    run: (req, res) => {
         res.redirect(process.env.INVITE);
    }
}