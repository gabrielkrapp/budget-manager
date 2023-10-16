import { Request, Response } from 'express';
import ConfigRoutes from "./ConfigRoutes";

class Login extends ConfigRoutes {

    constructor() {
        super()

        this.router.post('/login', this.loginUser.bind(this));
    }

    private loginUser(req: Request, res: Response): void {
        const { email, password }: { email: string; password: string } = req.body;

        const data = this.loadData();
        const user = {
            email,
            password
        };

        const foundUser = data.users.find((user: { email: string; password: string; }) => user.email === email && user.password === password);

        if (foundUser) {
            res.json("Login successful");
        } else {
            res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
        }
    }
}

export default new Login().router;