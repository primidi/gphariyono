import { type CollectionEntry, getCollection } from 'astro:content'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import {
  type Locale,
  useTranslations,
  getDateLocale,
  parseEntryId
} from '../../../../lib/i18n'

export async function getStaticPaths() {
  const entries = await getCollection('fragments')
  return entries.map(entry => {
    const { lang, slug } = parseEntryId(entry.id)
    return {
      params: { locale: lang, slug },
      props: { entry, locale: lang }
    }
  })
}

interface Props {
  entry: CollectionEntry<'fragments'>
  locale: Locale
}

export const GET = async ({ props }: { props: Props }) => {
  const { entry, locale } = props
  const t = useTranslations(locale)
  const dateFmt = getDateLocale(locale)

  const fontRegular = await readFile(
    join(process.cwd(), 'public/fonts/Inter-Regular.woff')
  )
  const fontBold = await readFile(
    join(process.cwd(), 'public/fonts/Inter-Bold.woff')
  )

  const { title, date, mood, location } = entry.data

  const moodColors: Record<string, string> = {
    contemplative: '#60A5FA',
    energetic: '#FACC15',
    melancholic: '#818CF8',
    neutral: '#9CA3AF',
    euphoric: '#F472B6'
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
                    children: t('fragments.ogLabel'),
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
                    children: date.toLocaleDateString(dateFmt, {
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
      'Cache-Control': 'public, max-age=86400, immutable'
    }
  })
}
