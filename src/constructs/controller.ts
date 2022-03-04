export default class BaseController {
    constructor() {}

    getPath(path: string) {
        return `/v1/${path}`;
    }
}
