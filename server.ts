import bodyParser from "body-parser";
import cors from "cors";
import App from "./src/app";
import AuthController from "./src/controllers/auth.controller";
import UserController from "./src/controllers/user.controller";

const port: number = 4000;

/**
 * Middlewares
 */
const bodyParserUrl = bodyParser.urlencoded({ extended: false });
const bodyParserJson = bodyParser.json();
const corsMiddleware = cors();

/**
 * Controllers
 */
const authController = new AuthController();
const userController = new UserController();

const middlewares: any[] = [bodyParserUrl, bodyParserJson, corsMiddleware];
const controllers: any[] = [authController, userController];

const server = new App(port, middlewares, controllers);

server.initApp();
