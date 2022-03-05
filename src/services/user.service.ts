import { Request, Response } from "express";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { ERR_INVALID_USER } from "../constants/constant";

const db = new JsonDB(new Config("authDB", true, true, "/"));

export default class UserService {
    constructor() {}

    getUser = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const dbPath = `/user/${id}`;
            const user = db.getData(dbPath);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json(ERR_INVALID_USER);
        }
    };
}
