import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema,
  }),
  baseURL: import.meta.env.BETTER_AUTH_URL,
  secret: import.meta.env.BETTER_AUTH_SECRET,
  trustedOrigins: import.meta.env.BETTER_AUTH_URL ? [import.meta.env.BETTER_AUTH_URL] : [],
  user: {
    modelName: "users",
    additionalFields: {
      username: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "admin",
        input: false,
      },
      lastLoginAt: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60,
    updateAge: 30 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 60 * 15, max: 10 },
      "/sign-up/email": { window: 60 * 60, max: 5 },
    },
  },
  emailAndPassword: {
    enabled: true,
    signUp: {
      enabled: true,
    },
    minPasswordLength: 6,
  },
  advanced: {
    useSecureCookies: import.meta.env.PROD,
    database: {
      generateId: options => {
        if (options.model === "user" || options.model === "users") {
          return false;
        }
        return crypto.randomUUID();
      },
    },
  },
});

export type AuthSession = typeof auth.$Infer.Session;
export type Auth = typeof auth;
