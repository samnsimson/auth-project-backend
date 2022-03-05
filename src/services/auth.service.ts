import { Request, Response } from "express";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import speakeasy, { GenerateSecretOptions } from "speakeasy";
import {
    ERR_INVALID_USER,
    ERR_USER_EXISTS,
    ERR_WRONG_PASSWORD,
} from "../constants/constant";
import * as QRCode from "qrcode";
import md5 from "md5";

const db = new JsonDB(new Config("authDB", true, true, "/"));
const authIssuer: GenerateSecretOptions = {
    name: "2FA Auth",
};
export default class AuthService {
    constructor() {}

    public login = (req: Request, res: Response) => {
        const { username, password } = req.body;
        const id = md5(username);
        const dbPath = `/user/${id}`;
        try {
            const user = db.getData(dbPath);
            user && user.password === password
                ? res.status(200).json({
                      id: user.id,
                      username: user.username,
                      secret: user.base32,
                  })
                : res.status(400).json(ERR_WRONG_PASSWORD);
        } catch (error: any) {
            res.status(400).json(ERR_INVALID_USER);
        }
    };

    public verifyOTP = (req: Request, res: Response) => {
        const { secret: base32, token } = req.body;
        const verified = speakeasy.totp.verify({
            secret: base32,
            token: token,
            encoding: "base32",
        });
        res.status(verified ? 200 : 400).send(verified);
    };

    public signup = async (req: Request, res: Response) => {
        try {
            const user = req.body;
            const id = md5(user.username);
            const userAvailable = this.getUser(id);
            if (userAvailable) throw new Error(JSON.stringify(ERR_USER_EXISTS));
            const dbPath = `/user/${id}`;
            const secret = speakeasy.generateSecret(authIssuer);
            const secretUrl = secret.otpauth_url as string;
            const qrcode = await QRCode.toDataURL(secretUrl);
            db.push(dbPath, {
                id,
                qrcode,
                ...user,
                ...secret,
            });
            res.status(200).json({ id, qrcode });
        } catch (error: any) {
            error = JSON.parse(error.message);
            res.status(error.status || 500).send(
                error.message || "Server Error"
            );
        }
    };

    protected getUser = (id: string): string | null => {
        try {
            const dbPath = `/user/${id}`;
            const user = db.getData(dbPath);
            return user.id;
        } catch (error: any) {
            return null;
        }
    };
}
