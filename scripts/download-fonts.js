import fs from 'fs'
import path from 'path'
import https from 'https'

const fontsDir = path.join(process.cwd(), 'public', 'fonts')

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true })
}

const fonts = [
  {
    name: 'Inter-Regular.woff',
    url: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff'
  },
  {
    name: 'Inter-Bold.woff',
    url: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff'
  }
]

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https
      .get(url, response => {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          console.log(`Downloaded ${dest}`)
          resolve()
        })
      })
      .on('error', err => {
        fs.unlink(dest)
        reject(err)
      })
  })
}

async function main() {
  for (const font of fonts) {
    await downloadFile(font.url, path.join(fontsDir, font.name))
  }
}

main().catch(console.error)
