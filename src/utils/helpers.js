export const IMG_BASE = 'https://image.tmdb.org/t/p'

export function posterUrl(path, size = 'w500') {
  if (!path) return null
  return `${IMG_BASE}/${size}${path}`
}

export function backdropUrl(path, size = 'w780') {
  if (!path) return null
  return `${IMG_BASE}/${size}${path}`
}

export function formatYear(dateStr) {
  if (!dateStr) return 'TBA'
  return new Date(dateStr).getFullYear()
}

export function formatRating(vote) {
  if (!vote && vote !== 0) return 'N/A'
  return vote.toFixed(1)
}

export function stars(rating) {
  // Convert 0-10 scale to 0-5 stars
  const filled = Math.round(rating / 2)
  return Array.from({ length: 5 }, (_, i) => i < filled ? '★' : '☆').join('')
}

export function truncate(text, max = 120) {
  if (!text) return 'No description available.'
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + '…'
}

export function useDebounce(value, delay) {
  const [debounced, setDebounced] = React.useState(value)
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

// Need to import React for the hook above
import React from 'react'
