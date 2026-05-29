import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  port: parseInt(process.env.SERVER_PORT ?? '3000', 10),
  host: process.env.SERVER_HOST ?? 'localhost',
  apiPrefix: process.env.API_PREFIX,

  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: parseInt(process.env.JWT_EXPIRATION ?? '3600', 10),
  },
}));
