import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../server';

export function verifyToken(req: any, res: any, next: any): void {
    const bearerHeader = req.header('Authorization');
    if (!bearerHeader) return res.status(401).send('Access Denied');

    const token = bearerHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        console.log('Verified token:', verified);
        req.user = verified;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(400).send('Invalid Token');
    }
    
}

