import { Router } from 'express';
import path from 'path';
import fs from 'fs';

class ConfigRoutes {
    router: Router;
    dataPath: string;

    constructor() {
        this.router = Router();
        this.dataPath = path.join(__dirname, '..', '..', 'database', 'database.json');
    }
}

export default ConfigRoutes;