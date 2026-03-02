/**
 * Convert a hex color string to HSL components in the format "H S% L%"
 * compatible with Tailwind CSS variable convention (no hsl() wrapper).
 */
export function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '250 99% 35%' // fallback

  const r = parseInt(result[1], 16) / 255
  const g = parseInt(result[2], 16) / 255
  const b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

/** Darken an HSL string by reducing lightness by `amount` percentage points. */
export function darkenHsl(hsl: string, amount: number): string {
  const parts = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/)
  if (!parts) return hsl
  const l = Math.max(0, parseInt(parts[3]) - amount)
  return `${parts[1]} ${parts[2]}% ${l}%`
}

/** Lighten an HSL string by increasing lightness by `amount` percentage points. */
export function lightenHsl(hsl: string, amount: number): string {
  const parts = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/)
  if (!parts) return hsl
  const l = Math.min(100, parseInt(parts[3]) + amount)
  return `${parts[1]} ${parts[2]}% ${l}%`
}
