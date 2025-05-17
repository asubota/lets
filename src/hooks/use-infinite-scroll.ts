import { useEffect, useRef, useState } from 'react'

const BATCH_SIZE = 40
const options = {
  rootMargin: '400px',
}

export const useInfiniteScroll = <T>(list: T[]) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const visibleList = list.slice(0, visibleCount)
  const hasMore = visibleCount < list.length

  useEffect(() => {
    if (!hasMore) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisibleCount((prev) => prev + BATCH_SIZE)
      }
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasMore])

  return { visibleList, hasMore, loadMoreRef: ref }
}
