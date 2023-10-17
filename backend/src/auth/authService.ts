import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../server';

export function generateToken(user: any, expiresIn: string = '1h'): string {
    return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn });
}
