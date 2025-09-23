import 'dotenv/config'
import { drizzle } from 'drizzle-orm/mysql2'
import { seed, reset } from 'drizzle-seed'
import * as schema from './db/schema.js'

const db = drizzle(process.env.DATABASE_URL!, { schema, mode: 'default' })
await reset(db, schema)

// seeding
await seed(db, schema) // por default inserta 10 registros de c/tabla

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
