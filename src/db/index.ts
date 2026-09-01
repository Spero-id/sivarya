import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

console.log("DB URL:", import.meta.env.DATABASE_URL);

const poolConnection = mysql.createPool({
  uri: import.meta.env.DATABASE_URL,
});

export const db = drizzle(poolConnection, { schema, mode: "default" });