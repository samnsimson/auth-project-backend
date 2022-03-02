import express, { Application } from "express";
import { Controller } from "./types/types.controller";

export default class App {
    public port: number;
    public middlewares: any[];
    public controllers: Controller[];
    public app: Application;

    constructor(port: number, middlewares: any[], controllers: Controller[]) {
        this.port = port;
        this.middlewares = middlewares;
        this.controllers = controllers;
        this.app = express();
    }

    initApp() {
        this.useMiddlewares();
        this.useControllers();
        this.listen();
    }

    useMiddlewares() {
        this.middlewares.map((middleware) => {
            this.app.use(middleware);
        });
    }

    useControllers() {
        this.controllers.map((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }
}
