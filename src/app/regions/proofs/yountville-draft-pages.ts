/** InDesign draft exports — `public/Yountville/`. */
export const YOUNTVILLE_DRAFT_SPREADS = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    src: `/Yountville/WS063026_napaYountville_draft_Page_${n}.jpg`,
    page: i + 1,
  }
})
