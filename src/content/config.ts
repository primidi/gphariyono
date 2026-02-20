import { defineCollection, z } from 'astro:content'

const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    tags: z.array(z.string())
  })
})

const fragments = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    mood: z.enum([
      'contemplative',
      'energetic',
      'melancholic',
      'neutral',
      'euphoric'
    ]),
    location: z.string().optional()
  })
})

export const collections = { essays, fragments }
