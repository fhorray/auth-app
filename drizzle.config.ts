import { config } from 'dotenv';

export default {
  schema: './db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
};
