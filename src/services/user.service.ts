import { Request, Response } from "express";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { ERR_INVALID_USER } from "../constants/constant";

const db = new JsonDB(new Config("authDB", true, true, "/"));

export default class UserService {
    constructor() {}

    getAllUsers = (req: Request, res: Response) => {
        try {
            const dbPath = `/user`;
            const user = db.getData(dbPath);
            const userList = Object.values(user);
            res.status(200).json(userList);
        } catch (error) {
            res.status(404).json(ERR_INVALID_USER);
        }
    };

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

    checkin = (req: Request, res: Response) => {
        try {
            const { id, time } = req.body;
            const dbPath = `/user/${id}`;
            const user = db.getData(dbPath);
            user.checkin = time;
            db.push(dbPath, user);
            res.status(200).json(time);
        } catch (error) {
            res.sendStatus(500);
        }
    };
}
