import 'dotenv/config'
import { drizzle } from 'drizzle-orm/mysql2'
import { eq } from 'drizzle-orm'
import { character, characterClass, item, characterToItems } from './db/schema.js'
import * as schema from './db/schema.js'

const db = drizzle(process.env.DATABASE_URL!, { schema, mode: 'default' })

await db.delete(characterToItems)
await db.delete(character)
await db.delete(item)
await db.delete(characterClass)

/*--------------------
CRUD characterClass
---------------------*/

console.clear()
console.log('-----------------\n CharacterClass \n----------------- \n')

// Create
const [lord, jedi, bh] = await db
  .insert(characterClass)
  .values([
    { name: 'Lord Sith', descripcion: 'A wielder of the force who has embraced the dark side' },
    { name: 'Jedi', descripcion: 'A wielder of the force who fights for peace and justice' },
    { name: 'Bounty Hunter', descripcion: 'A mercenary who hunts down targets for a price' },
  ])
  .$returningId()

// Read (usando select simple)
const classes = await db.select().from(characterClass)
console.log('Obtenemos las character classes: ', classes)

// Update
await db
  .update(characterClass)
  .set({
    descripcion:
      'A wielder of the force who has embraced the dark side and seeks to dominate the galaxy',
  })
  .where(eq(characterClass.name, 'Lord Sith'))
const charMod = await db.select().from(characterClass).where(eq(characterClass.name, 'Lord Sith'))
console.log('\nCharacter class modificado: ', charMod)

// Delete
// await db.delete(characterClass).where(eq(characterClass.name, 'Lord Sith'))

/*--------------------
item
---------------------*/

// create
console.log('\n--------------\n Item \n-------------- \n')

const [lights, blas, td] = await db
  .insert(schema.item)
  .values([
    {
      name: 'Lightsaber',
      descripcion: 'A weapon for a more civilized age',
    },
    {
      name: 'Blaster',
      descripcion: 'A ranged weapon that fires energy bolts',
    },
    {
      name: 'Thermal Detonator',
      descripcion: 'A powerful explosive device',
    },
  ])
  .$returningId()

// Read
const items = await db.select().from(item)
console.log('Traemos todos los items: ', items)

/*--------------------
character
---------------------*/
console.log('\n--------------\n Character \n-------------- \n')

// Create
const [dv, ls, bf] = await db
  .insert(character)
  .values([
    {
      name: 'Darth Vader',
      level: 10,
      hp: 100,
      attack: 25,
      classId: lord.id,
    },
    {
      name: 'Luke Skywalker',
      level: 8,
      hp: 80,
      attack: 20,
      classId: jedi.id,
    },
    {
      name: 'Boba Fett',
      level: 7,
      hp: 70,
      attack: 15,
      classId: bh.id,
    },
  ])
  .$returningId()

/*-----------------------------
tabla de union characterToItems
-------------------------------*/
await db.insert(schema.characterToItems).values([
  { characterId: dv.id, itemId: lights.id },
  { characterId: ls.id, itemId: blas.id },
  { characterId: bf.id, itemId: td.id },
])

// Read
const characters = await db.query.character.findMany({
  columns: {
    name: true,
    level: true,
    hp: true,
    attack: true,
  },
  with: { classC: true, items: { with: { item: true } } },
})

console.dir(characters, { depth: null, colors: true })
