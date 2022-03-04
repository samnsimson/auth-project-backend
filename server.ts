import bodyParser from "body-parser";
import App from "./src/app";
import AuthController from "./src/controllers/auth.controller";

const port: number = 3000;

/**
 * Middlewares
 */
const bodyParserUrl = bodyParser.urlencoded({ extended: false });
const bodyParserJson = bodyParser.json();

/**
 * Controllers
 */
const authController = new AuthController();

const middlewares: any[] = [bodyParserUrl, bodyParserJson];
const controllers: any[] = [authController];

const server = new App(port, middlewares, controllers);

server.initApp();
