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

    loadData(): any {
        const rawData = fs.readFileSync(this.dataPath, 'utf-8');
        return JSON.parse(rawData);
    }

    saveData(data: any): void {
        fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
    }
}

export default ConfigRoutes;
