import 'dotenv/config'
import { drizzle } from 'drizzle-orm/mysql2'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.js'
import * as schema from './db/schema.js'
import { character, characterClass, item } from './db/schema.js'
import { eq } from 'drizzle-orm'

const db = drizzle(process.env.DATABASE_URL!, { schema, mode: 'default' })

const app = express()
app.use(express.json())
// Configuracion Swagger

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }))
app.get('/docs.json', (_req, res) => res.json(swaggerSpec))

/*
  CharacterClass
  -----------------------
*/

// 1. Crear clase
app.post('/classes', async (req, res) => {
  const c = req.body
  try {
    const cls = await db.insert(characterClass).values(c)

    res.json(cls)
  } catch (err) {
    res.status(400).json({ error: 'Error creando clase', detail: String(err) })
  }
})

// 2. Listar clases
app.get('/classes', async (_req, res) => {
  const classes = await db.select().from(characterClass).orderBy(characterClass.name)

  res.json(classes)
})

/* 
 Item
 ------------
*/

// 1. Crear ítem
app.post('/items', async (req, res) => {
  const i = req.body
  try {
    const it = await db.insert(item).values(i)

    res.json(it)
  } catch (err) {
    res.status(400).json({ error: 'Error creando ítem', detail: String(err) })
  }
})

// 2. Listar ítems
app.get('/items', async (_req, res) => {
  const items = await db.select().from(item).orderBy(item.name)
  res.json(items)
})

/* 
 Character
 ------------
*/

// 1. Crear personaje
app.post('/characters', async (req, res) => {
  const c = req.body

  try {
    const char = await db.insert(character).values(c)

    res.json(char)
  } catch (err) {
    res.status(400).json({ error: 'Error creando personaje', detail: String(err) })
  }
})

// 2. Listar personajes con clases e items, paginado
app.get('/characters', async (req, res) => {
  const { page, limit } = req.body
  const result = await db
    .select({
      id: character.id,
      name: character.name,
      level: character.level,
      hp: character.hp,
      attack: character.attack,
      class: characterClass.name,
    })
    .from(character)
    .innerJoin(characterClass, eq(character.classId, characterClass.id))
    .orderBy(character.id)
    .limit(Number(limit)) // the number of rows to return
    .offset(Number(page)) // the number of rows to skip
  res.json(result)
})

const chars = await db.query.character.findMany({
  with: {},
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
