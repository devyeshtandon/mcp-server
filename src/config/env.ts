import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
} as const;

const requiredEnvVars: (keyof typeof env)[] = ['BASE_URL', 'API_URL'];

for (const envVar of requiredEnvVars) {
    if (!env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}