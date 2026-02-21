import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { locales, type Locale, useTranslations } from '../../lib/i18n'

export function getStaticPaths() {
  return locales.map(locale => ({ params: { locale }, props: { locale } }))
}

interface Props {
  locale: Locale
}

export const GET = async ({ props }: { props: Props }) => {
  const { locale } = props
  const t = useTranslations(locale)
  const tags: string[] = JSON.parse(t('og.tags'))

  const fontRegular = await readFile(
    join(process.cwd(), 'public/fonts/Inter-Regular.woff')
  )
  const fontBold = await readFile(
    join(process.cwd(), 'public/fonts/Inter-Bold.woff')
  )

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
                alignItems: 'center',
                padding: '80px',
                zIndex: 10
              },
              children: [
                {
                  type: 'div',
                  props: {
                    children: 'GHARIS P. HARIYONO',
                    style: {
                      letterSpacing: '0.2em',
                      fontSize: '24px',
                      color: '#71717a',
                      marginBottom: '20px'
                    }
                  }
                },
                {
                  type: 'h1',
                  props: {
                    children: 'Mind Engraving',
                    style: {
                      fontSize: '96px',
                      fontWeight: 700,
                      color: '#f4f4f5',
                      lineHeight: 1.1,
                      margin: 0,
                      marginBottom: '30px',
                      textAlign: 'center'
                    }
                  }
                },
                {
                  type: 'p',
                  props: {
                    children: t('og.tagline'),
                    style: {
                      fontSize: '32px',
                      color: '#a1a1aa',
                      lineHeight: 1.5,
                      margin: 0,
                      marginBottom: '40px',
                      textAlign: 'center',
                      maxWidth: '800px'
                    }
                  }
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: '16px',
                      marginTop: '40px'
                    },
                    children: tags.map(tag => ({
                      type: 'span',
                      props: {
                        children: tag,
                        style: {
                          fontSize: '20px',
                          color: '#e4e4e7',
                          backgroundColor: '#27272a',
                          padding: '8px 24px',
                          borderRadius: '9999px',
                          fontFamily: 'monospace'
                        }
                      }
                    }))
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
          backgroundColor: '#09090b',
          fontFamily: 'Inter'
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
