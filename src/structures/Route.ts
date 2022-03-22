import { Request, Response } from "express";

export default interface Route {
    route: string,
    parentRoute?: string,
    middleWare?: Array<any>
    run: Run
}
export interface Run {
  (
    req: Request,
    res: Response
  );
}
