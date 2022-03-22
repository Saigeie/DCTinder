import Route from "../../structures/Route"

export const Route: Route = {
    route: "login",
    parentRoute: "auth",
    run: (req, res) => {
         res.redirect("https://discord.com/api/oauth2/authorize?client_id=955226778656440360&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code&scope=identify%20connections%20guilds");
    }
}