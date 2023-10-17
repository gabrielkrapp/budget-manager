import { Request, Response } from 'express';
import ConfigRoutes from "./ConfigRoutes";
import { generateToken } from '../auth/authService';
import { pool } from '../database/databse';

class Login extends ConfigRoutes {

    constructor() {
        super()

        this.router.post('/login', this.loginUser.bind(this));
    }

    private async loginUser(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
    
        try {
            const client = await pool.connect();
            const query = 'SELECT id FROM users WHERE email = $1 AND password = $2';
            const { rows } = await client.query(query, [email, password]);
    
            if (rows.length > 0) {
                const userid = rows[0].id;
                const token = generateToken({ userid, email });
                client.release();
                res.json({ token });
            } else {
                client.release();
                res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
}

export default new Login().router;