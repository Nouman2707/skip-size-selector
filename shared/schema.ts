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

// API Response types based on actual WeWantWaste API
export interface SkipApiResponse {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}
