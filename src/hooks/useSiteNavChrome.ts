'use client'

import { useLayoutEffect, useState } from 'react'

export type SiteNavChrome = 'light' | 'dark'

function detectChrome(): SiteNavChrome {
  const surface = document.querySelector('[data-site-surface]')?.getAttribute('data-site-surface')
  if (surface === 'light') return 'light'
  return 'dark'
}

/** Light cream bar on editorial pages; dark bar on homepage and dark surfaces. */
export function useSiteNavChrome(): SiteNavChrome {
  const [chrome, setChrome] = useState<SiteNavChrome>('dark')

  useLayoutEffect(() => {
    setChrome(detectChrome())
  }, [])

  return chrome
}
