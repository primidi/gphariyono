import { type CollectionEntry, getCollection } from 'astro:content'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function getStaticPaths() {
  const entries = await getCollection('fragments')
  return entries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry }
  }))
}

interface Props {
  entry: CollectionEntry<'fragments'>
}

export const GET = async ({ props }: { props: Props }) => {
  const { entry } = props

  const fontRegular = await readFile(
    join(process.cwd(), 'public/fonts/Inter-Regular.woff')
  )
  const fontBold = await readFile(
    join(process.cwd(), 'public/fonts/Inter-Bold.woff')
  )

  const { title, date, mood, location } = entry.data

  const moodColors: Record<string, string> = {
    contemplative: '#60A5FA', // text-blue-400
    energetic: '#FACC15', // text-yellow-400
    melancholic: '#818CF8', // text-indigo-400
    neutral: '#9CA3AF', // text-gray-400
    euphoric: '#F472B6' // text-pink-400
  }

  const moodColor = moodColors[mood as string] || '#A1A1AA'

  const svg = await satori(
    {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#18181b',
                backgroundImage:
                  'radial-gradient(circle at 25% 25%, #27272a 2%, transparent 0%), radial-gradient(circle at 75% 75%, #27272a 2%, transparent 0%)',
                backgroundSize: '24px 24px',
                opacity: 0.4
              }
            }
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                padding: '80px'
              },
              children: [
                {
                  type: 'div',
                  props: {
                    children: 'FRAGMENTS',
                    style: {
                      letterSpacing: '0.2em',
                      fontSize: '24px',
                      color: '#71717a',
                      marginBottom: '10px'
                    }
                  }
                },
                {
                  type: 'div',
                  props: {
                    children: date.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }),
                    style: {
                      fontSize: '20px',
                      color: '#52525b',
                      marginBottom: '40px'
                    }
                  }
                },
                {
                  type: 'h1',
                  props: {
                    children: title,
                    style: {
                      fontSize: '64px',
                      fontWeight: 700,
                      color: '#f4f4f5',
                      lineHeight: 1.1,
                      margin: 0,
                      marginBottom: '20px'
                    }
                  }
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '24px',
                      marginTop: 'auto'
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          children: '●',
                          style: {
                            color: moodColor,
                            marginRight: '12px'
                          }
                        }
                      },
                      {
                        type: 'span',
                        props: {
                          children: mood.toUpperCase(),
                          style: {
                            color: '#a1a1aa',
                            fontWeight: 400
                          }
                        }
                      },
                      location
                        ? {
                            type: 'span',
                            props: {
                              children: `// ${location.toUpperCase()}`,
                              style: {
                                color: '#52525b',
                                marginLeft: '24px'
                              }
                            }
                          }
                        : null
                    ]
                  }
                }
              ]
            }
          }
        ],
        style: {
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#09090b'
        }
      }
    } as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontRegular,
          weight: 400,
          style: 'normal'
        },
        {
          name: 'Inter',
          data: fontBold,
          weight: 700,
          style: 'normal'
        }
      ]
    }
  )
  const resvg = new Resvg(svg)
  const pngData = resvg.render().asPng()

  return new Response(pngData as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      // Cache for 1 day
      'Cache-Control': 'public, max-age=86400, immutable'
    }
  })
}
