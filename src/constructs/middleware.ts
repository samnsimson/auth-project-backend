import e, { NextFunction, Request, Response } from "express";

export default class MiddleWare {
    constructor() {}

    authorize(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(500).json({
                error: true,
                message: "Username & Password is required",
            });
        } else {
            next();
        }
    }
}
