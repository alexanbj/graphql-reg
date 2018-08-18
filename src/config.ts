import dotenv from 'dotenv';

// Load env variables
dotenv.load();
const clientId = process.env.CLIENT_ID;

export { clientId };
