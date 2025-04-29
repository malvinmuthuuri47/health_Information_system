import dotenv from 'dotenv';

dotenv.config();

const getEnvVar = (key: string): string => {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }

    return value;
}

const env = {
    PORT: getEnvVar('PORT'),
    MONGO_URI: getEnvVar('mongo_uri'),
};

export default env;