import 'dotenv/config'
import { drizzle } from 'drizzle-orm/mysql2'
import { eq } from 'drizzle-orm'
import { seed, reset } from 'drizzle-seed'
import * as schema from './db/schema.js'
import {
  character,
  characterClass,
  characterToItems,
  item,
} from './db/schema.js'

const db = drizzle(process.env.DATABASE_URL!)

// seeding
await reset(db, schema)
await seed(db, schema) // por default inserta 10 registros de c/tabla

// Read
const result = await db
  .select({
    character_id: character.id,
    character_name: character.name,
    class_name: characterClass.name,
    item_name: item.name,
  })
  .from(character)
  .innerJoin(characterClass, eq(character.classId, characterClass.id))
  .innerJoin(
    schema.characterToItems,
    eq(character.id, characterToItems.characterId)
  )
  .innerJoin(item, eq(characterToItems.itemId, item.id))

console.clear()
console.dir(result, { depth: null, colors: true })
