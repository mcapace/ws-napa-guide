'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import {
  filterSearchItems,
  groupSearchResults,
  type SearchItem,
} from '@/lib/site-search'
import styles from './SiteSearchOverlay.module.css'

export type SiteSearchOverlayProps = {
  open: boolean
  onClose: () => void
}

let cachedIndex: SearchItem[] | null = null
let indexPromise: Promise<SearchItem[]> | null = null

async function loadSearchIndex(): Promise<SearchItem[]> {
  if (cachedIndex) return cachedIndex
  if (!indexPromise) {
    indexPromise = fetch('/api/search-index')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load search index')
        const data = (await res.json()) as SearchItem[]
        cachedIndex = data
        return data
      })
      .catch((err) => {
        indexPromise = null
        throw err
      })
  }
  return indexPromise
}

export function SiteSearchOverlay({ open, onClose }: SiteSearchOverlayProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<SearchItem[] | null>(cachedIndex)
  const [loadError, setLoadError] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const results = index ? filterSearchItems(index, query) : []
  const groups = groupSearchResults(results)

  useEffect(() => {
    if (!open) return

    setQuery('')
    setActiveIndex(0)
    setLoadError(false)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40)

    loadSearchIndex()
      .then((data) => setIndex(data))
      .catch(() => setLoadError(true))

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const goTo = useCallback(
    (href: string) => {
      try {
        const url = new URL(href, window.location.origin)
        const place = url.searchParams.get('place')
        if (place && url.pathname.startsWith('/explore')) {
          sessionStorage.setItem('ws-explore-focus-place', place)
        }
      } catch {
        /* ignore */
      }
      onClose()
      router.push(href)
    },
    [onClose, router],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (results.length === 0) return
        setActiveIndex((i) => (i + 1) % results.length)
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (results.length === 0) return
        setActiveIndex((i) => (i - 1 + results.length) % results.length)
        return
      }

      if (e.key === 'Enter') {
        const item = results[activeIndex]
        if (item) {
          e.preventDefault()
          goTo(item.href)
        }
      }
    },
    [activeIndex, goTo, onClose, results],
  )

  let flatOffset = 0

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search the guide"
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <div className={styles.inputWrap}>
                <Search className={styles.searchIcon} aria-hidden size={20} strokeWidth={1.75} />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  className={styles.input}
                  placeholder="Search towns, wineries, dining…"
                  aria-controls={listId}
                  aria-autocomplete="list"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                {query ? (
                  <button
                    type="button"
                    className={styles.clearBtn}
                    aria-label="Clear search"
                    onClick={() => {
                      setQuery('')
                      inputRef.current?.focus()
                    }}
                  >
                    <X size={16} strokeWidth={2} aria-hidden />
                  </button>
                ) : null}
              </div>
              <button type="button" className={styles.closeBtn} onClick={onClose}>
                Close
              </button>
            </div>

            <div id={listId} className={styles.results} role="listbox">
              {loadError ? (
                <p className={styles.empty}>Search couldn’t load. Try again in a moment.</p>
              ) : !index ? (
                <p className={styles.empty}>Loading…</p>
              ) : !query.trim() ? (
                <p className={styles.empty}>
                  Search towns, wineries, dining, stays, stories, and itineraries.
                </p>
              ) : results.length === 0 ? (
                <p className={styles.empty}>No matches for “{query.trim()}”.</p>
              ) : (
                groups.map((group) => {
                  const groupStart = flatOffset
                  flatOffset += group.items.length
                  return (
                    <section key={group.kind} className={styles.group}>
                      <h2 className={styles.groupLabel}>{group.label}</h2>
                      <ul className={styles.list}>
                        {group.items.map((item, i) => {
                          const flatIndex = groupStart + i
                          const active = flatIndex === activeIndex
                          return (
                            <li key={item.id}>
                              <Link
                                href={item.href}
                                role="option"
                                aria-selected={active}
                                className={`${styles.result} ${active ? styles.resultActive : ''}`}
                                onClick={() => {
                                  try {
                                    const url = new URL(item.href, window.location.origin)
                                    const place = url.searchParams.get('place')
                                    if (place && url.pathname.startsWith('/explore')) {
                                      sessionStorage.setItem('ws-explore-focus-place', place)
                                    }
                                  } catch {
                                    /* ignore */
                                  }
                                  onClose()
                                }}
                                onMouseEnter={() => setActiveIndex(flatIndex)}
                              >
                                <span className={styles.resultTitle}>{item.title}</span>
                                <span className={styles.resultSub}>{item.subtitle}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </section>
                  )
                })
              )}
            </div>

            <p className={styles.hint}>
              <kbd>↑</kbd>
              <kbd>↓</kbd> to move · <kbd>Enter</kbd> to open · <kbd>Esc</kbd> to close
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
