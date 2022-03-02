import { Request, Response } from "express";

export default class AuthService {
    constructor() {}

    login(req: Request, res: Response) {
        res.status(200).send("Login");
    }

    signup(req: Request, res: Response) {
        res.status(200).send("Signup");
    }
}
