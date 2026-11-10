/** Sphere geometry and tour order for SpeakerGlobe. */
const GOLDEN = Math.PI * (3 - Math.sqrt(5))

// Even spread of N points over a unit sphere
export const fibonacciSphere = (n) =>
  Array.from({ length: n }, (_, i) => {
    const y = 1 - ((i + 0.5) / n) * 2
    const r = Math.sqrt(1 - y * y)
    return { x: Math.cos(GOLDEN * i) * r, y, z: Math.sin(GOLDEN * i) * r }
  })

// Rotate around Y then X; returns the projected point
export const rotate = ({ x, y, z }, rx, ry) => {
  const x1 = x * Math.cos(ry) - z * Math.sin(ry)
  const z1 = x * Math.sin(ry) + z * Math.cos(ry)
  return {
    x: x1,
    y: y * Math.cos(rx) - z1 * Math.sin(rx),
    z: y * Math.sin(rx) + z1 * Math.cos(rx),
  }
}

// Rotation that brings `p` to the front of the globe
export const facing = (p) => {
  const ry = Math.atan2(p.x, p.z)
  return { ry, rx: Math.atan2(p.y, Math.hypot(p.x, p.z)) }
}

// Shortest angular path, so focusing never spins the long way round
export const nearest = (from, to) =>
  from + Math.atan2(Math.sin(to - from), Math.cos(to - from))

export const clampX = (rx) => Math.max(-1.2, Math.min(1.2, rx))

/**
 * Tour order: start at the first face and always hop to the nearest face not
 * yet shown. Every speaker comes to the front once per lap, and each hop is
 * short, so the globe glides instead of whipping around.
 */
export const tourOrder = (points) => {
  const left = new Set(points.map((_, i) => i))
  const order = []
  let at = 0
  while (left.size) {
    left.delete(at)
    order.push(at)
    let best = null
    let bestD = Infinity
    for (const j of left) {
      const p = points[at]
      const q = points[j]
      const d = (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2
      if (d < bestD) {
        bestD = d
        best = j
      }
    }
    at = best
  }
  return order
}
