import { NextFunction, Request, Response } from "express"

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
    return req.user ? next() : res.render("pages/401.ejs")
}

const alreadySignedIn = async (req: Request, res: Response, next: NextFunction) => {
    
}
export { validateUser }