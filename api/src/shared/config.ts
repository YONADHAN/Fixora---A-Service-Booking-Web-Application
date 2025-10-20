import dotenv from 'dotenv'
dotenv.config()

export const config = {
  cors: {
    ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN || 'http://localhost:3000',
    FRONTEND_URL: process.env.NEXT_FRONTEND_URL || 'http://localhost:3000',
  },

  server: {
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  database: {
    URI: process.env.DATABASE_URI || '',
  },

  nodemailer: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
  jwt: {
    ACCESS_SECRET_KEY: process.env.JWT_ACCESS_KEY || 'access-secret-key',
    ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    REFRESH_SECRET_KEY: process.env.JWT_REFRESH_KEY || 'refresh-secret-key',
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '14d',
    RESET_SECRET_KEY: process.env.JWT_RESET_SECRET_KEY || 'reset-secret-key',
    RESET_EXPIRES_IN: process.env.JWT_RESET_EXPIRES_IN || '5m',
  },

  redis: {
    REDIS_USERNAME: process.env.REDIS_USERNAME || 'default',
    REDIS_PASS: process.env.REDIS_PASS,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT || '18498',
  },
  cloudinary: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  googleAuth: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  },

  OtpExpiry: process.env.OTP_EXPIRY_IN_MINUTES || '2',

  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
}
