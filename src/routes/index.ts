import fs from "fs";
import glob from "glob";
import { promisify } from "util";
const globPromise = promisify(glob);

export default async function (app) {
  const Files = await globPromise(`${process.cwd()}/src/routes/**/*.ts`);
  Files.map((x) => {
    const file = require(x).Route;
    if (!file) return;
    let route = "";
    if (file.parentRoute !== null) {
      route += `${file.parentRoute}/`;
    }
    route += file.route;

    app.get(`/${route}`, (req, res) => {
      file.run(req, res);
    });
  });
}
