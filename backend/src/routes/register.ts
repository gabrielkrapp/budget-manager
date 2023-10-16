import { Request, Response } from 'express';
import ConfigRoutes from "./ConfigRoutes";

class Register extends ConfigRoutes {

    constructor() {
        super()

        this.router.post('/register', this.registerUser.bind(this));
    }

    private registerUser(req: Request, res: Response): void {
        const { name, email, password }: { name: string; email: string; password: string } = req.body;

        const data = this.loadData();
        const newItem = {
            id: data.users.length + 1,
            name,
            email,
            password
        };

        data.users.push(newItem);
        this.saveData(data);
        res.json(newItem);
    }
}

export default new Register().router;