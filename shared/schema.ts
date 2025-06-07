import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const skips = pgTable("skips", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  size: text("size").notNull(),
  cubicYards: text("cubic_yards").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("GBP"),
  dimensions: text("dimensions"),
  maxWeight: text("max_weight"),
  description: text("description"),
  features: text("features").array(),
  popular: boolean("popular").default(false),
  available: boolean("available").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSkipSchema = createInsertSchema(skips).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSkip = z.infer<typeof insertSkipSchema>;
export type Skip = typeof skips.$inferSelect;

// API Response types
export interface SkipApiResponse {
  id: string;
  name: string;
  size: string;
  price: number;
  currency: string;
  dimensions?: string;
  weight_limit?: string;
  description?: string;
  features?: string[];
  popular?: boolean;
  available?: boolean;
}
