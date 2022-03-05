import { Router } from "express";
import BaseController from "../constructs/controller";
import AuthService from "../services/auth.service";

export default class AuthController extends BaseController {
    public path: string;
    public router: Router;
    public auth: AuthService;

    constructor() {
        super();
        this.path = this.getPath("auth");
        this.router = Router();
        this.auth = new AuthService();
        this.initRouter();
    }

    initRouter = () => {
        this.initPostMethods();
    };

    initPostMethods = () => {
        this.router.post("/register", this.auth.signup);
        this.router.post("/login", this.auth.login);
        this.router.post("/verify", this.auth.verifyOTP);
    };
}
