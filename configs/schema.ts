import { integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credit: integer().default(0),
});

export const screenshotTable = pgTable("screenshot", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uid: varchar().notNull(),
  description: varchar({ length: 255 }).notNull(),
  imageUrl: varchar({ length: 255 }).notNull(),
  model: varchar({ length: 255 }).notNull(),
  code: json(),
  createdBy: varchar({ length: 255 }).notNull(),

})
