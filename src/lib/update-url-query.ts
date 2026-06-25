/** Update query string without Next.js router navigation (preserves scroll position). */
export function replaceUrlQuery(pathname: string, params: URLSearchParams): void {
  const qs = params.toString()
  const url = qs ? `${pathname}?${qs}` : pathname
  window.history.replaceState(window.history.state, '', url)
}
