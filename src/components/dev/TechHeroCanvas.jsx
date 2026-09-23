import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  prefersReducedMotion,
  onReducedMotionChange,
} from '@/hooks/usePrefersReducedMotion'

const MATRIX_CHARS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ01{}()<>/;=+'.split('')

// ==================== SCENE DEFINITIONS ====================
// Each scene has its own skyline silhouette and label
const SCENES = [
  {
    label: '// THE FACTORIES — INDUSTRIAL POWERHOUSE',
    sublabel: 'Detroit • Early 1900s',
    buildings: [
      // Dense, low, wide industrial buildings with many smokestacks
      // All 'solid' and 'stack' styles — heavy industry feel
      // More smokestacks than the current scene 1, spread across full width
      { x: 0.02, w: 0.14, h: 0.16, style: 'solid' },
      { x: 0.1, w: 0.03, h: 0.42, style: 'stack' },
      { x: 0.15, w: 0.12, h: 0.18, style: 'solid' },
      { x: 0.22, w: 0.03, h: 0.48, style: 'stack' },
      { x: 0.26, w: 0.1, h: 0.14, style: 'solid' },
      { x: 0.32, w: 0.16, h: 0.2, style: 'solid' },
      { x: 0.38, w: 0.03, h: 0.44, style: 'stack' },
      { x: 0.44, w: 0.12, h: 0.17, style: 'solid' },
      { x: 0.52, w: 0.03, h: 0.4, style: 'stack' },
      { x: 0.56, w: 0.14, h: 0.22, style: 'solid' },
      { x: 0.64, w: 0.03, h: 0.46, style: 'stack' },
      { x: 0.68, w: 0.1, h: 0.15, style: 'solid' },
      { x: 0.74, w: 0.03, h: 0.38, style: 'stack' },
      { x: 0.78, w: 0.12, h: 0.19, style: 'solid' },
      { x: 0.86, w: 0.03, h: 0.43, style: 'stack' },
      { x: 0.9, w: 0.08, h: 0.14, style: 'solid' },
    ],
    hasConveyor: false,
  },
  {
    label: "// ASSEMBLY LINE — BUILDING THE WORLD'S CARS",
    sublabel: 'Ford Rouge Complex • 1913',
    buildings: [
      // Similar factories but with more structure, organized
      { x: 0.05, w: 0.12, h: 0.18, style: 'solid' },
      { x: 0.14, w: 0.03, h: 0.4, style: 'stack' },
      { x: 0.18, w: 0.1, h: 0.15, style: 'solid' },
      { x: 0.25, w: 0.03, h: 0.45, style: 'stack' },
      { x: 0.3, w: 0.14, h: 0.2, style: 'solid' },
      { x: 0.42, w: 0.03, h: 0.38, style: 'stack' },
      { x: 0.46, w: 0.1, h: 0.16, style: 'solid' },
      { x: 0.55, w: 0.15, h: 0.22, style: 'solid' },
      { x: 0.68, w: 0.03, h: 0.42, style: 'stack' },
      { x: 0.72, w: 0.12, h: 0.18, style: 'solid' },
      { x: 0.82, w: 0.03, h: 0.35, style: 'stack' },
      { x: 0.86, w: 0.1, h: 0.14, style: 'solid' },
    ],
    hasConveyor: true, // This scene has the conveyor belt with cars
  },
  {
    label: '// THE CITY RISES — MOTOWN TO METROPOLIS',
    sublabel: 'Downtown Detroit • 1960s',
    buildings: [
      // Mix of residential, Hitsville, Fox Theatre
      { x: 0.03, w: 0.06, h: 0.22, style: 'gold' },
      { x: 0.1, w: 0.05, h: 0.28, style: 'wireframe' },
      { x: 0.16, w: 0.08, h: 0.2, style: 'gold' },
      { x: 0.25, w: 0.05, h: 0.35, style: 'matrix' },
      { x: 0.32, w: 0.07, h: 0.25, style: 'gold' },
      { x: 0.4, w: 0.06, h: 0.42, style: 'wireframe' }, // Fox Theatre
      { x: 0.48, w: 0.05, h: 0.3, style: 'gold' },
      { x: 0.55, w: 0.08, h: 0.22, style: 'matrix' },
      { x: 0.64, w: 0.05, h: 0.38, style: 'wireframe' },
      { x: 0.7, w: 0.07, h: 0.26, style: 'gold' },
      { x: 0.78, w: 0.06, h: 0.32, style: 'matrix' },
      { x: 0.85, w: 0.05, h: 0.24, style: 'gold' },
      { x: 0.92, w: 0.05, h: 0.28, style: 'wireframe' },
    ],
    hasConveyor: false,
  },
  {
    label: '// NEW DETROIT — INNOVATION ON THE RIVER',
    sublabel: 'COMPASS Detroit • 2026',
    buildings: [
      // Ambassador Bridge (left side) — suspension bridge
      {
        x: 0.01,
        w: 0.18,
        h: 0.3,
        style: 'bridge-suspension',
        label: 'Ambassador Bridge',
      },
      // Downtown buildings
      { x: 0.15, w: 0.04, h: 0.3, style: 'matrix' },
      { x: 0.2, w: 0.03, h: 0.38, style: 'wireframe' },
      // Hudson's Site / Book Tower (tall prominent tower)
      {
        x: 0.24,
        w: 0.045,
        h: 0.6,
        style: 'gold',
        label: 'Hudson Building',
      },
      { x: 0.29, w: 0.035, h: 0.42, style: 'wireframe' },
      // Ren Cen cluster (5 towers, center-right)
      { x: 0.34, w: 0.03, h: 0.5, style: 'matrix' },
      { x: 0.375, w: 0.025, h: 0.62, style: 'wireframe' },
      { x: 0.405, w: 0.03, h: 0.72, style: 'matrix' }, // tallest - center tower
      { x: 0.44, w: 0.025, h: 0.65, style: 'wireframe' },
      { x: 0.47, w: 0.03, h: 0.52, style: 'matrix' },
      // More downtown
      { x: 0.51, w: 0.035, h: 0.35, style: 'gold' },
      { x: 0.55, w: 0.04, h: 0.48, style: 'wireframe' },
      { x: 0.6, w: 0.03, h: 0.38, style: 'matrix' },
      { x: 0.64, w: 0.035, h: 0.45, style: 'gold' },
      { x: 0.68, w: 0.03, h: 0.52, style: 'wireframe' },
      { x: 0.72, w: 0.04, h: 0.4, style: 'matrix' },
      // Gordie Howe International Bridge (right side) — cable-stayed
      {
        x: 0.78,
        w: 0.2,
        h: 0.35,
        style: 'bridge-cable-stayed',
        label: 'Gordie Howe Bridge',
      },
    ],
    hasConveyor: false,
  },
]

const SCENE_DURATION = 12 // seconds per scene
const TRANSITION_DURATION = 2 // seconds for crossfade
const MAX_DT = 1 / 30 // clamp frame delta so jank / tab switches never jump
const FPS_BASE = 60 // legacy per-frame speeds were tuned at 60fps
const RESIZE_DEBOUNCE_MS = 120
const WINDOW_TOGGLES_PER_SEC = 0.35 // per building — a few windows per second
const WINDOW_FADE_RATE = 4 // 1/s — lit windows ease on/off instead of snapping
const PARALLAX_EASE_RATE = 5 // 1/s

// Base colors — per-draw opacity goes through ctx.globalAlpha
const GOLD = 'rgb(245,179,1)'
const GREEN = 'rgb(0,255,102)'
const EMERALD = 'rgb(16,185,129)'
const YELLOW = 'rgb(255,215,0)'
const SMOKE = 'rgb(200,200,200)'
const SLATE = 'rgb(15,23,42)'
// Opaque base behind lit structures so the rain never bleeds through them
const SILHOUETTE = 'rgb(3,14,8)'
const WHITE = 'rgb(255,255,255)'
const BG_BOTTOM = '#081a10'

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const randomChar = () =>
  MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]

// Deterministic [0, 1) hash so lit-window patterns survive resizes
function hash3(a, b, c) {
  let h =
    (Math.imul(a, 374761393) +
      Math.imul(b, 668265263) +
      Math.imul(c, 1442695041)) |
    0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

// Window grid for a building: rows/cols match the original floor loops
// (index 0 === floor/column 1). `level` is each window's lit brightness.
function buildWindows(
  seed,
  bw,
  bh,
  rowPitch,
  colPitch,
  litChance,
  minA,
  spanA
) {
  const rows = Math.max(0, Math.floor(bh / rowPitch) - 1)
  const cols = Math.max(0, Math.floor(bw / colPitch) - 1)
  const n = rows * cols
  const level = new Float32Array(n)
  const target = new Float32Array(n)
  const cur = new Float32Array(n)
  for (let f = 0; f < rows; f++) {
    for (let c = 0; c < cols; c++) {
      const i = f * cols + c
      level[i] = minA + hash3(seed, f, c * 2 + 1) * spanA
      target[i] = hash3(seed, f, c * 2) < litChance ? level[i] : 0
      cur[i] = target[i]
    }
  }
  return { rows, cols, level, target, cur, acc: Math.random() }
}

function updateWindows(win, dt) {
  if (dt <= 0 || win.target.length === 0) return
  const { level, target, cur } = win
  win.acc += dt * WINDOW_TOGGLES_PER_SEC
  while (win.acc >= 1) {
    win.acc -= 1
    const i = Math.floor(Math.random() * target.length)
    target[i] = target[i] > 0 ? 0 : level[i]
  }
  const k = 1 - Math.exp(-dt * WINDOW_FADE_RATE)
  for (let i = 0; i < cur.length; i++) {
    const d = target[i] - cur[i]
    if (d !== 0) cur[i] = Math.abs(d) < 0.002 ? target[i] : cur[i] + d * k
  }
}

export default function TechHeroCanvas({ onSceneChange }) {
  const canvasRef = useRef(null)
  // Kept in a ref so a new callback identity never restarts the render loop
  const onSceneChangeRef = useRef(onSceneChange)

  useEffect(() => {
    onSceneChangeRef.current = onSceneChange
  }, [onSceneChange])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let dpr = 1
    let animId = null
    let lastTs = null
    let t = 0
    let lastSceneIndex = -1
    let sceneAlpha = 1

    let reduced = prefersReducedMotion()
    let inView = true
    let pageVisible = !document.hidden

    // Pointer parallax — raw pointer stored on move, eased inside the loop
    let mx = 0.5
    let my = 0.5
    let pointerX = null
    let pointerY = null
    let rect = null
    let rectDirty = true

    let codeDrops = []
    let particles = []

    // Resize-dependent caches
    let baseY = 0
    let bgGradient = null
    let groundGlow = null
    let bottomFade = null
    // sceneCaches[sceneIndex][buildingIndex] => { gradient?, windows } | null
    let sceneCaches = []

    const setAlpha = (k) => {
      ctx.globalAlpha = sceneAlpha * k
    }

    // ---- Pixel snapping (device pixels) so strokes and glyphs stay crisp ----
    // Snap a coordinate to the device-pixel grid
    const px = (v) => Math.round(v * dpr) / dpr
    // Line widths as whole device pixels (never a blurry 1.5 device px)
    const lw = (w) => Math.max(1, Math.round(w * dpr)) / dpr
    // Stroke centre: odd device widths sit on a half pixel, even on a whole one
    const sp = (v, w) => {
      const d = Math.max(1, Math.round(w * dpr))
      return d % 2
        ? (Math.floor(v * dpr) + 0.5) / dpr
        : Math.round(v * dpr) / dpr
    }
    const crispFillRect = (x, y, w, h) => {
      const x0 = px(x)
      const y0 = px(y)
      ctx.fillRect(x0, y0, px(x + w) - x0, px(y + h) - y0)
    }
    const crispStrokeRect = (x, y, w, h, width) => {
      ctx.lineWidth = lw(width)
      const x0 = sp(x, width)
      const y0 = sp(y, width)
      ctx.strokeRect(x0, y0, sp(x + w, width) - x0, sp(y + h, width) - y0)
    }
    // Horizontal / vertical segments added to the current path
    const hLine = (x0, x1, y, width) => {
      const sy = sp(y, width)
      ctx.moveTo(px(x0), sy)
      ctx.lineTo(px(x1), sy)
    }
    const vLine = (x, y0, y1, width) => {
      const sx = sp(x, width)
      ctx.moveTo(sx, px(y0))
      ctx.lineTo(sx, px(y1))
    }

    function makeDrop(i) {
      const len = Math.floor(Math.random() * 14) + 6
      const chars = []
      for (let j = 0; j < len; j++) chars.push(randomChar())
      return {
        x: i * 16 + 8,
        y: Math.random() * H,
        speed: 1 + Math.random() * 2,
        chars,
        len,
        isGold: Math.random() < 0.15,
      }
    }

    function makeParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H * 0.55,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 2 + 0.5,
        a: Math.random() * 0.5 + 0.2,
        isGold: Math.random() < 0.3,
      }
    }

    function buildCaches() {
      // Whole CSS pixel so every building edge and the ground line align
      baseY = Math.round(H * 0.88)

      bgGradient = ctx.createLinearGradient(0, 0, 0, H)
      bgGradient.addColorStop(0, '#000804')
      bgGradient.addColorStop(0.6, '#02120a')
      bgGradient.addColorStop(1, BG_BOTTOM)

      groundGlow = ctx.createLinearGradient(0, baseY, 0, H)
      groundGlow.addColorStop(0, 'rgba(0,255,102,0.16)')
      groundGlow.addColorStop(1, 'rgba(0,0,0,0)')

      // Fade into the canvas's own base colour; the page wrapper then blends
      // that into var(--surface) so light themes don't get a grey band
      bottomFade = ctx.createLinearGradient(0, H * 0.88, 0, H)
      bottomFade.addColorStop(0, 'rgba(8,26,16,0)')
      bottomFade.addColorStop(1, BG_BOTTOM)

      sceneCaches = SCENES.map((scene, si) =>
        scene.buildings.map((b, bi) => {
          const bw = b.w * W
          const bh = b.h * H * 0.82
          const seed = si * 100 + bi
          if (b.style === 'wireframe') {
            return {
              windows: buildWindows(seed, bw, bh, 9, 5, 0.55, 0.25, 0.35),
            }
          }
          if (b.style === 'gold') {
            // Vertical gradient is x-independent, so it stays valid under parallax
            const gradient = ctx.createLinearGradient(0, baseY - bh, 0, baseY)
            gradient.addColorStop(0, 'rgba(245,179,1,0.3)')
            gradient.addColorStop(1, 'rgba(212,160,23,0.08)')
            return {
              gradient,
              windows: buildWindows(seed, bw, bh, 8, 4, 0.6, 0.35, 0.45),
            }
          }
          return null
        })
      )
    }

    // Resize without regenerating the scene: rescale what exists and only
    // spawn drops/particles for newly exposed area.
    function layout() {
      const newW = canvas.clientWidth
      const newH = canvas.clientHeight
      const newDpr = Math.min(window.devicePixelRatio || 1, 2)
      if (!newW || !newH) return
      if (newW === W && newH === H && newDpr === dpr && sceneCaches.length) {
        return
      }

      const sx = W ? newW / W : 1
      const sy = H ? newH / H : 1
      W = newW
      H = newH
      dpr = newDpr
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      for (const d of codeDrops) d.y *= sy
      const cols = Math.floor(W / 16)
      if (codeDrops.length > cols) codeDrops.length = cols
      while (codeDrops.length < cols) codeDrops.push(makeDrop(codeDrops.length))

      for (const p of particles) {
        p.x *= sx
        p.y *= sy
      }
      const count = Math.min(Math.floor((W * H) / 14000), 60)
      if (particles.length > count) particles.length = count
      while (particles.length < count) particles.push(makeParticle())

      buildCaches()
      rectDirty = true
      // Setting canvas.width clears it — repaint immediately when paused
      if (animId === null) render(0)
    }

    function drawBackground() {
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, W, H)
    }

    function drawMatrixRain(dt) {
      const step = dt * FPS_BASE
      const mutateChance = 0.03 * step
      const fadeEdge = W * 0.45
      ctx.font = '600 12px monospace'
      for (const drop of codeDrops) {
        drop.y += drop.speed * step
        if (drop.y > H + drop.len * 15) {
          drop.y = -drop.len * 15
          for (let j = 0; j < drop.len; j++) drop.chars[j] = randomChar()
        }
        const leftFade =
          drop.x < fadeEdge ? Math.max(0.06, drop.x / fadeEdge) : 1
        const trailColor = drop.isGold ? GOLD : GREEN
        const trailAlpha = drop.isGold ? 0.7 : 0.55
        let style = null
        for (let j = 0; j < drop.len; j++) {
          const cy = drop.y - j * 15
          if (cy < 0 || cy > H) continue
          const nextStyle = j === 0 ? WHITE : trailColor
          if (nextStyle !== style) {
            ctx.fillStyle = nextStyle
            style = nextStyle
          }
          ctx.globalAlpha =
            j === 0
              ? leftFade * 0.9
              : (1 - j / drop.len) * leftFade * trailAlpha
          if (mutateChance > 0 && Math.random() < mutateChance) {
            drop.chars[j] = randomChar()
          }
          // Whole device pixels — fractional glyph positions render soft
          ctx.fillText(drop.chars[j], drop.x, px(cy))
        }
      }
      ctx.globalAlpha = 1
    }

    function drawWindows(win, bx, visibleY, rowPitch, colPitch, yOff, ww, wh) {
      const { rows, cols, cur } = win
      for (let f = 0; f < rows; f++) {
        const fy = visibleY + (f + 1) * rowPitch + yOff
        for (let c = 0; c < cols; c++) {
          const a = cur[f * cols + c]
          if (a < 0.01) continue
          setAlpha(a)
          crispFillRect(bx + (c + 1) * colPitch - 1, fy, ww, wh)
        }
      }
    }

    // Opaque body so background rain never shows through a building
    function drawSilhouette(x, y, w, h, color = SILHOUETTE, alpha = 0.96) {
      setAlpha(alpha)
      ctx.fillStyle = color
      crispFillRect(x, y, w, h)
    }

    function drawBuilding(b, cache, prlxX, dt) {
      // Snap the building origin once so every edge shares the same grid
      const bx = px(b.x * W + prlxX * (b.h * 0.4))
      const bw = px(b.w * W)
      const bh = px(b.h * H * 0.82) // LARGER buildings
      const visibleY = baseY - bh

      if (b.style === 'stack') {
        // Industrial smokestack
        const sw = px(bw * 0.6)
        const sx = px(bx + (bw - sw) / 2)
        drawSilhouette(sx, visibleY, sw, bh, SLATE)
        setAlpha(0.9)
        ctx.strokeStyle = GOLD
        crispStrokeRect(sx, visibleY, sw, bh, 1.5)
        // Smoke particles
        ctx.fillStyle = SMOKE
        for (let s = 0; s < 3; s++) {
          const sy = visibleY - 5 - s * 8 + Math.sin(t * 2 + b.x * 10 + s) * 4
          const sx2 = sx + sw / 2 + Math.cos(t * 1.5 + s * 2) * 6
          setAlpha(0.22 - s * 0.05)
          ctx.beginPath()
          ctx.arc(sx2, sy, 3 + s * 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
        return
      }

      if (b.style === 'matrix') {
        drawSilhouette(bx, visibleY, bw, bh)
        const cols = Math.floor(bw / 9)
        const rows = Math.floor(bh / 11)
        const charStep = Math.floor(t * 4)
        ctx.fillStyle = GREEN
        for (let r = 0; r < rows; r++) {
          // +10 puts the alphabetic baseline inside the row, not above it
          const ry = visibleY + r * 11 + 10
          for (let c = 0; c < cols; c++) {
            setAlpha(0.5 + Math.sin(t * 2.5 + r * 0.4 + c * 0.3) * 0.25)
            ctx.fillText(
              MATRIX_CHARS[(r + c + charStep) % MATRIX_CHARS.length],
              bx + c * 9 + 1,
              ry
            )
          }
        }
        setAlpha(0.9)
        ctx.strokeStyle = GREEN
        crispStrokeRect(bx, visibleY, bw, bh, 1)
      } else if (b.style === 'wireframe') {
        drawSilhouette(bx, visibleY, bw, bh)
        setAlpha(0.9)
        ctx.strokeStyle = EMERALD
        crispStrokeRect(bx, visibleY, bw, bh, 1)
        const floors = Math.floor(bh / 9)
        if (floors > 1) {
          ctx.lineWidth = lw(1)
          ctx.beginPath()
          for (let f = 1; f < floors; f++) {
            hLine(bx, bx + bw, visibleY + f * 9, 1)
          }
          setAlpha(0.3)
          ctx.stroke()
        }
        if (cache) {
          updateWindows(cache.windows, dt)
          ctx.fillStyle = GREEN
          drawWindows(cache.windows, bx, visibleY, 9, 5, 2, 2, 2)
        }
      } else if (b.style === 'gold') {
        drawSilhouette(bx, visibleY, bw, bh)
        if (cache) {
          setAlpha(1)
          ctx.fillStyle = cache.gradient
          crispFillRect(bx, visibleY, bw, bh)
        }
        setAlpha(0.9)
        ctx.strokeStyle = GOLD
        crispStrokeRect(bx, visibleY, bw, bh, 1)
        if (cache) {
          updateWindows(cache.windows, dt)
          ctx.fillStyle = YELLOW
          drawWindows(cache.windows, bx, visibleY, 8, 4, 1, 2, 3)
        }
      } else if (b.style === 'bridge-suspension') {
        // Suspension bridge (Ambassador Bridge style)
        const deckY = baseY - bh * 0.3 // deck height
        const towerH = bh * 0.85
        const tower1X = bx + bw * 0.25
        const tower2X = bx + bw * 0.75
        const midX = (tower1X + tower2X) / 2

        // Deck
        setAlpha(0.9)
        ctx.strokeStyle = GOLD
        ctx.lineWidth = lw(2.5)
        ctx.lineCap = 'butt'
        ctx.beginPath()
        hLine(bx, bx + bw, deckY, 2.5)
        ctx.stroke()

        // Towers
        ctx.lineWidth = lw(3)
        ctx.beginPath()
        vLine(tower1X, deckY, baseY - towerH, 3)
        vLine(tower2X, deckY, baseY - towerH, 3)
        ctx.stroke()

        // Main cables (catenary curves)
        setAlpha(0.8)
        ctx.strokeStyle = GREEN
        ctx.lineWidth = lw(1.5)
        ctx.lineJoin = 'round'
        ctx.beginPath()
        ctx.moveTo(bx, deckY - 5)
        ctx.quadraticCurveTo(
          tower1X,
          baseY - towerH - 10,
          midX,
          deckY + bh * 0.1
        )
        ctx.quadraticCurveTo(tower2X, baseY - towerH - 10, bx + bw, deckY - 5)
        ctx.stroke()

        // Vertical suspender cables — one path, one stroke
        const cableCount = 12
        setAlpha(0.45)
        ctx.lineWidth = lw(0.5)
        ctx.beginPath()
        for (let ci = 1; ci < cableCount; ci++) {
          const cx = bx + (bw / cableCount) * ci
          vLine(cx, deckY, baseY - towerH + Math.abs(cx - midX) * 0.8, 0.5)
        }
        ctx.stroke()
      } else if (b.style === 'bridge-cable-stayed') {
        // Cable-stayed bridge (Gordie Howe style)
        const deckY = baseY - bh * 0.3
        const towerX = px(bx + bw * 0.5) // single central tower
        const towerTop = px(baseY - bh * 0.95)

        // Deck
        setAlpha(0.9)
        ctx.strokeStyle = EMERALD
        ctx.lineWidth = lw(2.5)
        ctx.lineCap = 'butt'
        ctx.beginPath()
        hLine(bx, bx + bw, deckY, 2.5)
        ctx.stroke()

        // Tower (A-frame shape)
        ctx.lineWidth = lw(3)
        ctx.lineJoin = 'round'
        ctx.beginPath()
        ctx.moveTo(towerX - 3, px(deckY))
        ctx.lineTo(towerX, towerTop)
        ctx.lineTo(towerX + 3, px(deckY))
        ctx.stroke()

        // Cables fanning from tower to deck, both sides in one path
        setAlpha(0.6)
        ctx.strokeStyle = GREEN
        ctx.lineWidth = lw(0.8)
        const fanCount = 8
        const fanStep = (bw * 0.45) / fanCount
        ctx.beginPath()
        for (let fi = 1; fi <= fanCount; fi++) {
          const towerAnchorY =
            towerTop + (fi / fanCount) * (deckY - towerTop) * 0.5
          ctx.moveTo(towerX, towerAnchorY)
          ctx.lineTo(towerX - fanStep * fi, deckY)
          ctx.moveTo(towerX, towerAnchorY)
          ctx.lineTo(towerX + fanStep * fi, deckY)
        }
        ctx.stroke()
      } else {
        // solid industrial
        drawSilhouette(bx, visibleY, bw, bh, SLATE)
        setAlpha(0.85)
        ctx.strokeStyle = GOLD
        crispStrokeRect(bx, visibleY, bw, bh, 1)
        // Industrial details — horizontal beams
        const beams = Math.floor(bh / 14)
        if (beams > 1) {
          ctx.lineWidth = lw(1)
          ctx.beginPath()
          for (let b2 = 1; b2 < beams; b2++) {
            hLine(bx, bx + bw, visibleY + b2 * 14, 1)
          }
          setAlpha(0.25)
          ctx.stroke()
        }
      }
    }

    function drawConveyorLine() {
      const beltY = H * 0.82 // just above ground line

      // Belt line
      setAlpha(0.9)
      ctx.strokeStyle = GOLD
      ctx.lineWidth = lw(2)
      ctx.lineCap = 'butt'
      ctx.beginPath()
      hLine(W * 0.08, W * 0.92, beltY, 2)
      ctx.stroke()

      // Belt rollers (small circles along the belt)
      setAlpha(0.6)
      ctx.fillStyle = GOLD
      ctx.beginPath()
      for (let rx = 0.1; rx < 0.92; rx += 0.04) {
        const rcx = px(rx * W)
        const rcy = px(beltY + 3)
        ctx.moveTo(rcx + 2, rcy)
        ctx.arc(rcx, rcy, 2, 0, Math.PI * 2)
      }
      ctx.fill()

      // Cars sliding along the belt
      const carCount = 5
      const beltLen = W * 0.84 // belt from 0.08 to 0.92
      const beltStart = W * 0.08
      for (let i = 0; i < carCount; i++) {
        // Each car moves along the belt, wrapping around
        const offset = (t * 20 + i * (beltLen / carCount)) % beltLen
        const cx = px(beltStart + offset)
        const cy = px(beltY - 10)

        // Car body (simple rectangle)
        setAlpha(0.85)
        ctx.fillStyle = GOLD
        crispFillRect(cx - 12, cy - 4, 24, 8)
        // Car top (smaller rect)
        setAlpha(0.65)
        crispFillRect(cx - 6, cy - 10, 12, 6)
        // Wheels
        setAlpha(0.9)
        ctx.fillStyle = SMOKE
        ctx.beginPath()
        ctx.arc(cx - 7, cy + 5, 2.5, 0, Math.PI * 2)
        ctx.moveTo(cx + 9.5, cy + 5)
        ctx.arc(cx + 7, cy + 5, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawScene(index, alpha, prlxX, dt) {
      if (alpha <= 0) return
      sceneAlpha = alpha
      const scene = SCENES[index]
      const caches = sceneCaches[index]
      ctx.font = '600 10px monospace'

      for (let i = 0; i < scene.buildings.length; i++) {
        drawBuilding(scene.buildings[i], caches[i], prlxX, dt)
      }

      if (scene.hasConveyor) {
        drawConveyorLine()
      }

      // Ground line
      setAlpha(0.75)
      ctx.strokeStyle = GREEN
      ctx.lineWidth = lw(2)
      ctx.beginPath()
      hLine(0, W, baseY, 2)
      ctx.stroke()

      // Ground glow
      setAlpha(1)
      ctx.fillStyle = groundGlow
      ctx.fillRect(0, baseY, W, H - baseY)

      ctx.globalAlpha = 1
      sceneAlpha = 1
    }

    function drawParticles(dt) {
      const step = dt * FPS_BASE
      const prlxX = (mx - 0.5) * 30
      const prlxY = (my - 0.5) * 15
      const skyH = H * 0.55
      for (const p of particles) {
        p.x += p.vx * step
        p.y += p.vy * step
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = skyH
        if (p.y > skyH) p.y = 0
        ctx.globalAlpha = p.isGold ? p.a * 0.6 : p.a * 0.5
        ctx.fillStyle = p.isGold ? GOLD : GREEN
        ctx.beginPath()
        ctx.arc(p.x + prlxX * p.a, p.y + prlxY * p.a, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function updatePointer(dt) {
      if (pointerX === null || dt <= 0) return
      if (rectDirty || !rect) {
        rect = canvas.getBoundingClientRect()
        rectDirty = false
      }
      if (!rect.width || !rect.height) return
      const tx = clamp((pointerX - rect.left) / rect.width, -1, 2)
      const ty = clamp((pointerY - rect.top) / rect.height, -1, 2)
      const k = 1 - Math.exp(-dt * PARALLAX_EASE_RATE)
      mx += (tx - mx) * k
      my += (ty - my) * k
    }

    // Full-canvas paint; the opaque background fill makes clearRect redundant
    function render(dt) {
      if (!W || !H) return
      drawBackground()
      drawMatrixRain(dt)
      drawParticles(dt)

      // Scene crossfade logic
      const totalCycle = SCENES.length * SCENE_DURATION
      const cycleT = t % totalCycle
      const sceneIndex = Math.floor(cycleT / SCENE_DURATION)
      const sceneT = cycleT - sceneIndex * SCENE_DURATION

      // Notify parent when scene changes
      if (sceneIndex !== lastSceneIndex) {
        lastSceneIndex = sceneIndex
        onSceneChangeRef.current?.(sceneIndex)
      }

      // Eased crossfade into the next scene (snapped when motion is reduced)
      const fadeStart = SCENE_DURATION - TRANSITION_DURATION
      const progress =
        !reduced && sceneT > fadeStart
          ? easeInOutCubic((sceneT - fadeStart) / TRANSITION_DURATION)
          : 0
      const prlxX = (mx - 0.5) * 25

      drawScene(sceneIndex, 1 - progress, prlxX, dt)
      if (progress > 0) {
        drawScene((sceneIndex + 1) % SCENES.length, progress, prlxX, dt)
      }

      // Bottom fade
      ctx.fillStyle = bottomFade
      ctx.fillRect(0, H * 0.88, W, H * 0.12)
    }

    function frame(ts) {
      animId = requestAnimationFrame(frame)
      const dt = lastTs === null ? 0 : clamp((ts - lastTs) / 1000, 0, MAX_DT)
      lastTs = ts
      t += dt
      updatePointer(dt)
      render(dt)
    }

    function start() {
      if (animId !== null) return
      lastTs = null
      animId = requestAnimationFrame(frame)
    }

    function stop() {
      if (animId === null) return
      cancelAnimationFrame(animId)
      animId = null
    }

    // Loop only while on screen, tab visible, and motion is allowed
    function sync() {
      if (inView && pageVisible && !reduced) start()
      else stop()
    }

    const onMove = (e) => {
      pointerX = e.clientX
      pointerY = e.clientY
    }
    const onScroll = () => {
      rectDirty = true
    }
    const onVisibility = () => {
      pageVisible = !document.hidden
      sync()
    }
    const offReducedMotion = onReducedMotionChange((matches) => {
      reduced = matches
      sync()
      // Reduced motion: hold a single static frame
      if (animId === null) render(0)
    })

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    let resizeTimer = null
    const scheduleLayout = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(layout, RESIZE_DEBOUNCE_MS)
    }
    let resizeObserver = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleLayout)
      resizeObserver.observe(canvas)
    } else {
      window.addEventListener('resize', scheduleLayout)
    }

    let intersectionObserver = null
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver((entries) => {
        inView = entries[entries.length - 1].isIntersecting
        sync()
      })
      intersectionObserver.observe(canvas)
    }

    layout()
    sync()

    return () => {
      stop()
      clearTimeout(resizeTimer)
      if (resizeObserver) resizeObserver.disconnect()
      else window.removeEventListener('resize', scheduleLayout)
      intersectionObserver?.disconnect()
      offReducedMotion()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 block size-full"
      />
    </div>
  )
}

TechHeroCanvas.propTypes = {
  onSceneChange: PropTypes.func,
}
