// import { createServer } from 'node:http';

// const server = createServer((request, response) => {
//   response.write('Hello world!')

//   return response.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'
// import { DatabaseMemory } from './databaseMamory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  await database.create({
    title,
    description,
    duration
  })

  return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
  const { search } = request.query;
  const videos = await database.list(search)

  return videos;
})

server.put('/videos/:id', async (request, reply) => {
  const { title, description, duration } = request.body
  const { id: videoId } = request.params

  await database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
  const { id: videoId } = request.params

  await database.delete(videoId);

  return reply.status(204).send()
})

server.listen({
  port: process.env.PORT ?? 3333,
})