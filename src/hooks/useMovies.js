import { useState, useEffect, useCallback, useRef } from 'react'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export function useMovies(query, page = 1, genreId = null, sortMode = 'popular') {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const abortRef = useRef(null)

  const fetchMovies = useCallback(async () => {
    // Abort previous in-flight request
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setError(null)

    if (!API_KEY) {
      setError('API key not configured. Please add VITE_TMDB_API_KEY to your .env file.')
      setLoading(false)
      return
    }

    try {
      let url
      if (query && query.trim().length > 0) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query.trim())}&page=${page}&include_adult=false`
      } else if (genreId) {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`
      } else {
        url = `${BASE_URL}/movie/${sortMode}?api_key=${API_KEY}&page=${page}`
      }

      const res = await fetch(url, { signal: abortRef.current.signal })

      if (!res.ok) {
        if (res.status === 401) throw new Error('Invalid API key. Check your VITE_TMDB_API_KEY.')
        if (res.status === 429) throw new Error('Rate limit exceeded. Please slow down.')
        throw new Error(`API error: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()
      setMovies(data.results || [])
      setTotalPages(Math.min(data.total_pages || 0, 500)) // TMDB caps at 500
      setTotalResults(data.total_results || 0)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message || 'Something went wrong. Please try again.')
      setMovies([])
    } finally {
      setLoading(false)
    }
  }, [query, page, genreId, sortMode])

  useEffect(() => {
    fetchMovies()
    return () => abortRef.current?.abort()
  }, [fetchMovies])

  return { movies, loading, error, totalPages, totalResults, refetch: fetchMovies }
}

export function useGenres() {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (!API_KEY) return
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(d => setGenres(d.genres || []))
      .catch(() => {})
  }, [])

  return genres
}
