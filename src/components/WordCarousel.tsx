import { useEffect, useState } from 'react'
import { cn } from '../lib/utils'

interface WordCarouselProps {
  words: string[]
  interval?: number
  className?: string
}

export default function WordCarousel({
  words,
  interval = 2500,
  className
}: Readonly<WordCarouselProps>) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span
      className={cn(
        'relative inline-flex flex-col h-fit overflow-hidden align-bottom',
        className
      )}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            'absolute top-0 left-0 transition-all duration-500 ease-in-out whitespace-nowrap',
            i !== index && 'blur-[2px] opacity-30',
            i === index && 'blur-0 opacity-100'
          )}
          style={{
            transform: `translateY(${(i - index) * 100}%)`
          }}
        >
          {word}
        </span>
      ))}
      <span className="invisible">
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
    </span>
  )
}
