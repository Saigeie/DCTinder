import Route from "../../structures/Route";

export const Route: Route = {
  route: "logout",
  parentRoute: "auth",
  run: (req, res) => {
    res.clearCookie("connect.sid");
    res.redirect("/")
    
  },
};