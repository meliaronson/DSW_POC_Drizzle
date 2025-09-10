import 'dotenv/config'
import { drizzle } from 'drizzle-orm/mysql2'
import { eq } from 'drizzle-orm'
import { character, characterClass } from './db/schema.js'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definido en el archivo .env')
}

const db = drizzle(process.env.DATABASE_URL)

//----------CRUD characterClass----------

// Create
const newClass: typeof characterClass.$inferInsert = {
  name: 'Lord Sith',
  descripcion: 'A wielder of the force who has embraced the dark side',
}
await db.insert(characterClass).values(newClass)
console.log('New character class created!')

// Read
const classes = await db.select().from(characterClass)
console.log('Getting all character classes from the database: ', classes)

// Update
await db
  .update(characterClass)
  .set({
    descripcion: 'Wielder of the force who has embraced the dark side',
  })
  .where(eq(characterClass.name, 'Lord Sith'))
console.log('Character class info updated!')

// Delete     (COMENTAR PARA PODER EJECUTAR LA CRUD DE CHARACTER)
await db.delete(characterClass).where(eq(characterClass.name, 'Lord Sith'))
console.log('Character class deleted!')

//----------CRUD character----------

// Create
const newCharacter: typeof character.$inferInsert = {
  name: 'Darth Vader',
  level: 10,
  hp: 100,
  attack: 25,
  class: 1,
}
await db.insert(character).values(newCharacter)
console.log('New character created!')

// Read
const characters = await db.select().from(character)
console.log('Getting all characters from the database: ', characters)

// Update
await db
  .update(character)
  .set({
    level: 11,
  })
  .where(eq(character.name, 'Darth Vader'))
console.log('Character info updated!')

// Delete
await db.delete(character).where(eq(character.name, 'Darth Vader'))
console.log('Character deleted!')
