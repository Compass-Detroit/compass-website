import { useEffect, useState } from 'react'
import { DEVFEST_DAYS } from '@/data/2026/devfestProgram'

// Which day section is in view, for the sticky day bar
export default function useActiveDay() {
  const [active, setActive] = useState('hackathon')
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActive(e.target.dataset.day)
        ),
      { rootMargin: '-35% 0px -60% 0px' }
    )
    DEVFEST_DAYS.forEach((d) => {
      const el = document.getElementById(`day-${d.id}`)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return active
}
