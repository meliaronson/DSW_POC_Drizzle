import { relations } from 'drizzle-orm'
import { primaryKey } from 'drizzle-orm/gel-core'
import { int, varchar, AnyMySqlColumn, mysqlTable } from 'drizzle-orm/mysql-core'

// Crear database

export const characterClass = mysqlTable('CharacterClass', {
  id: int().primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }).notNull(),
  descripcion: varchar('descripcion', { length: 1000 }).notNull(),
})

export const character = mysqlTable('Character', {
  id: int().primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }).notNull(),
  level: int('level').notNull(),
  hp: int('hp').notNull(),
  attack: int('attack').notNull(),
  classId: int().references(() => characterClass.id),
})

export const item = mysqlTable('Item', {
  id: int().primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }).notNull(),
  descripcion: varchar('descripcion', { length: 1000 }).notNull(),
})

// Tabla intermedia (junction)
export const characterItems = mysqlTable('CharactersItems', {
  characterId: int('character_id')
    .notNull()
    .references(() => character.id, { onDelete: 'cascade' }),
  itemId: int('item_id')
    .notNull()
    .references(() => item.id, { onDelete: 'cascade' }),
})

// Character <-> Class
export const characterClassRelations = relations(character, ({ one }) => ({
  classC: one(characterClass), // un personaje tiene una clase
}))

// Character <-> Items
export const characterRelations = relations(character, ({ many }) => ({
  items: many(characterItems), // un personaje puede tener muchos items
}))

// Item <-> Characters
export const itemRelations = relations(item, ({ many }) => ({
  characters: many(characterItems), // un item puede pertenecer a muchos personajes
}))

// CharacterItems <-> Character / Item
export const characterItemsRelations = relations(characterItems, ({ one }) => ({
  character: one(character, {
    fields: [characterItems.characterId],
    references: [character.id],
  }),
  item: one(item, {
    fields: [characterItems.itemId],
    references: [item.id],
  }),
}))
