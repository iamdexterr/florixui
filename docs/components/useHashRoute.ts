import { useEffect, useState } from 'react'

/** Returns the current hash slug (without the leading "#/"). */
export function useHashRoute(): string {
  const read = () => window.location.hash.replace(/^#\/?/, '')
  const [slug, setSlug] = useState(read)

  useEffect(() => {
    const onChange = () => setSlug(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return slug
}
