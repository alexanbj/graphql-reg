import dotenv from 'dotenv';

// Load env variables
dotenv.load();
const clientId = process.env.CLIENT_ID;

if (!clientId) {
  console.error('Missing required environment variable CLIENT_ID');
  process.exit(1);
}

export { clientId };
