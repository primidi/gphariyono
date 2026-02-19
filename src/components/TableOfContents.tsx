import { useEffect, useState } from 'react'
import { cn } from '../lib/utils'

interface Heading {
  depth: number
  slug: string
  text: string
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({
  headings
}: Readonly<TableOfContentsProps>) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    headings.forEach(heading => {
      const element = document.getElementById(heading.slug)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 opacity-100 transition-opacity duration-500">
      {headings.map(heading => (
        <a
          key={heading.slug}
          href={`#${heading.slug}`}
          className={cn(
            'group flex items-center gap-2 transition-all duration-300 ease-elastic',
            activeId === heading.slug
              ? 'text-accent translate-x-0'
              : 'text-mist/40 hover:text-mist translate-x-4'
          )}
          style={{ marginLeft: `${(heading.depth - 1) * 12}px` }}
        >
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full transition-all duration-300',
              activeId === heading.slug
                ? 'bg-accent scale-150'
                : 'bg-mist/40 group-hover:bg-mist'
            )}
          />
          <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {heading.text}
          </span>
        </a>
      ))}
    </nav>
  )
}
