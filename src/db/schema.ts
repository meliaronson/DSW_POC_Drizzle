import { relations } from 'drizzle-orm';
import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";
import { AnyMySqlColumn } from "drizzle-orm/mysql-core";

export const character = table(
  "character",
  {
    id: t.int().primaryKey().autoincrement(),
    name: t.varchar("name", { length: 256 }).notNull(),
    level: t.int("level").notNull(),
    hp: t.int("hp").notNull(),
    attack: t.int("attack").notNull(),
    class: t.int().references((): AnyMySqlColumn => characterClass.id),
  },
  (table) => [
    //t.uniqueIndex("email_idx").on(table.email)
  ]
);

export const characterClass = table(
  "characterClass",
  {
    id: t.int().primaryKey().autoincrement(),
    name: t.varchar("name", { length: 256 }).notNull(),
    descripcion: t.varchar("descripcion",{ length: 1000}).notNull()
  },
  (table) => [

  ]
)

export const item = table(
  "item",
  {
    id: t.int().primaryKey().autoincrement(),
    name: t.varchar("name", { length: 256 }).notNull(),
    descripcion: t.varchar("descripcion",{ length: 1000}).notNull()
  },
  (table) => [

  ]
)


// Tabla intermedia (junction table)
export const characterItems = table("character_items", {
  characterId: int("character_id")
    .notNull()
    .references(() => character.id, { onDelete: "cascade" }),
  itemId: int("item_id")
    .notNull()
    .references(() => item.id, { onDelete: "cascade" }),
});


// Character ↔ Items
export const characterRelations = relations(character, ({ many }) => ({
  items: many(characterItems), // un personaje puede tener muchos items
}));

// Item ↔ Characters
export const itemRelations = relations(item, ({ many }) => ({
  characters: many(characterItems), // un item puede pertenecer a muchos personajes
}));

// CharacterItems ↔ Character / Item
export const characterItemsRelations = relations(characterItems, ({ one }) => ({
  character: one(character, {
    fields: [characterItems.characterId],
    references: [character.id],
  }),
  item: one(item, {
    fields: [characterItems.itemId],
    references: [item.id],
  }),
}));
