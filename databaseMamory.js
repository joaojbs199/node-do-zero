import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
  #videos = new Map()

  list(search) {
    return Array.from(this.#videos.entries())
    .map((item) => {
      const id = item[0];
      const video = item[1];

      return {
        id,
        ...video,
      }
    })
    .filter(video => {
      if (search) {
        return video.title.includes(search)
      }

      return true
    })
  }

  create(video) {
    const videoId = randomUUID()
    this.#videos.set(videoId, video)
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}