import { Router } from "express";
import BaseController from "../constructs/controller";
import UserService from "../services/user.service";

export default class UserController extends BaseController {
    public path: string;
    public router: Router;
    public user: UserService;

    constructor() {
        super();
        this.path = this.getPath("user");
        this.router = Router();
        this.user = new UserService();
        this.initRouter();
    }

    initRouter = () => {
        this.initGetMethods();
        this.initPostMethods();
    };

    initGetMethods = () => {
        this.router.get("/", this.user.getAllUsers);
        this.router.get("/:id", this.user.getUser);
    };

    initPostMethods = () => {
        this.router.post("/checkin", this.user.checkin);
    };
}
