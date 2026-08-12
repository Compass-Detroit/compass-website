import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

export default function TechHeroCanvas({ onSceneChange }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W, H

    let mx = 0.5,
      my = 0.5
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mx = (e.clientX - r.left) / r.width
      my = (e.clientY - r.top) / r.height
    }
    window.addEventListener('mousemove', onMove)

    const MATRIX_CHARS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ01{}()<>/;=+'.split(
      ''
    )

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

    let codeDrops = []
    let particles = []

    function init() {
      W = canvas.clientWidth
      H = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.floor(W / 16)
      codeDrops = []
      for (let i = 0; i < cols; i++) {
        codeDrops.push({
          x: i * 16 + 8,
          y: Math.random() * H,
          speed: 1 + Math.random() * 2,
          chars: [],
          len: Math.floor(Math.random() * 14) + 6,
          isGold: Math.random() < 0.15,
        })
        for (let j = 0; j < codeDrops[i].len; j++) {
          codeDrops[i].chars.push(
            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          )
        }
      }

      particles = []
      const count = Math.min(Math.floor((W * H) / 14000), 60)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H * 0.55,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 2 + 0.5,
          a: Math.random() * 0.5 + 0.2,
          isGold: Math.random() < 0.3,
        })
      }
    }

    const resize = () => init()
    window.addEventListener('resize', resize)
    init()

    let t = 0
    let lastSceneIndex = -1

    function drawBackground() {
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, '#000804')
      g.addColorStop(0.6, '#02120a')
      g.addColorStop(1, '#081a10')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
    }

    function drawMatrixRain() {
      ctx.font = '600 12px monospace'
      for (const drop of codeDrops) {
        drop.y += drop.speed
        if (drop.y > H + drop.len * 15) {
          drop.y = -drop.len * 15
          for (let j = 0; j < drop.len; j++) {
            drop.chars[j] =
              MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          }
        }
        const leftFade =
          drop.x < W * 0.45 ? Math.max(0.06, drop.x / (W * 0.45)) : 1.0
        for (let j = 0; j < drop.len; j++) {
          const cy = drop.y - j * 15
          if (cy < 0 || cy > H) continue
          const fade = (1 - j / drop.len) * leftFade
          if (j === 0) {
            ctx.fillStyle = `rgba(255,255,255,${leftFade * 0.9})`
          } else if (drop.isGold) {
            ctx.fillStyle = `rgba(245,179,1,${fade * 0.8})`
          } else {
            ctx.fillStyle = `rgba(0,255,102,${fade * 0.7})`
          }
          if (Math.random() < 0.03) {
            drop.chars[j] =
              MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          }
          ctx.fillText(drop.chars[j], drop.x, cy)
        }
      }
    }

    function drawBuilding(b, baseY, alpha, prlxX) {
      const bx = b.x * W + prlxX * (b.h * 0.4)
      const bw = b.w * W
      const bh = b.h * H * 0.82 // LARGER buildings
      const visibleY = baseY - bh

      if (b.style === 'stack') {
        // Industrial smokestack
        const sw = bw * 0.6
        const sx = bx + (bw - sw) / 2
        ctx.strokeStyle = `rgba(245,179,1,${0.5 * alpha})`
        ctx.lineWidth = 1.5
        ctx.strokeRect(sx, visibleY, sw, bh)
        // Smoke particles
        for (let s = 0; s < 3; s++) {
          const sy = visibleY - 5 - s * 8 + Math.sin(t * 2 + b.x * 10 + s) * 4
          const sx2 = sx + sw / 2 + Math.cos(t * 1.5 + s * 2) * 6
          ctx.beginPath()
          ctx.arc(sx2, sy, 3 + s * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200,200,200,${(0.15 - s * 0.04) * alpha})`
          ctx.fill()
        }
        return
      }

      if (b.style === 'matrix') {
        const cols = Math.floor(bw / 9)
        const rows = Math.floor(bh / 11)
        ctx.font = '600 9px monospace'
        for (let r = 0; r < rows; r++) {
          const ry = visibleY + r * 11
          for (let c = 0; c < cols; c++) {
            const rx = bx + c * 9
            const char =
              MATRIX_CHARS[(r + c + Math.floor(t * 4)) % MATRIX_CHARS.length]
            const a =
              (0.3 + Math.sin(t * 2.5 + r * 0.4 + c * 0.3) * 0.2) * alpha
            ctx.fillStyle = `rgba(0,255,102,${a})`
            ctx.fillText(char, rx, ry)
          }
        }
        ctx.strokeStyle = `rgba(0,255,102,${0.55 * alpha})`
        ctx.lineWidth = 1.2
        ctx.strokeRect(bx, visibleY, bw, bh)
      } else if (b.style === 'wireframe') {
        ctx.strokeStyle = `rgba(16,185,129,${0.5 * alpha})`
        ctx.lineWidth = 1
        ctx.strokeRect(bx, visibleY, bw, bh)
        const floors = Math.floor(bh / 9)
        for (let f = 1; f < floors; f++) {
          const fy = visibleY + f * 9
          ctx.beginPath()
          ctx.moveTo(bx, fy)
          ctx.lineTo(bx + bw, fy)
          ctx.strokeStyle = `rgba(16,185,129,${0.18 * alpha})`
          ctx.stroke()
        }
        for (let f = 1; f < floors; f++) {
          const fy = visibleY + f * 9
          const wc = Math.floor(bw / 5)
          for (let wi = 1; wi < wc; wi++) {
            if (Math.random() > 0.45) {
              ctx.fillStyle = `rgba(0,255,102,${
                (0.25 + Math.random() * 0.35) * alpha
              })`
              ctx.fillRect(bx + wi * 5 - 1, fy + 2, 2, 2)
            }
          }
        }
      } else if (b.style === 'gold') {
        const grd = ctx.createLinearGradient(bx, visibleY, bx, baseY)
        grd.addColorStop(0, `rgba(245,179,1,${0.22 * alpha})`)
        grd.addColorStop(1, `rgba(212,160,23,${0.04 * alpha})`)
        ctx.fillStyle = grd
        ctx.fillRect(bx, visibleY, bw, bh)
        ctx.strokeStyle = `rgba(245,179,1,${0.45 * alpha})`
        ctx.lineWidth = 1.2
        ctx.strokeRect(bx, visibleY, bw, bh)
        const floors = Math.floor(bh / 8)
        for (let f = 1; f < floors; f++) {
          const fy = visibleY + f * 8
          const wc = Math.floor(bw / 4)
          for (let wi = 1; wi < wc; wi++) {
            if (Math.random() > 0.4) {
              ctx.fillStyle = `rgba(255,215,0,${
                (0.35 + Math.random() * 0.45) * alpha
              })`
              ctx.fillRect(bx + wi * 4 - 1, fy + 1, 2, 3)
            }
          }
        }
      } else if (b.style === 'bridge-suspension') {
        // Suspension bridge (Ambassador Bridge style)
        const deckY = baseY - bh * 0.3 // deck height
        const towerH = bh * 0.85
        const tower1X = bx + bw * 0.25
        const tower2X = bx + bw * 0.75

        // Deck
        ctx.strokeStyle = `rgba(245,179,1,${0.5 * alpha})`
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.moveTo(bx, deckY)
        ctx.lineTo(bx + bw, deckY)
        ctx.stroke()

        // Towers
        ctx.strokeStyle = `rgba(245,179,1,${0.6 * alpha})`
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(tower1X, deckY)
        ctx.lineTo(tower1X, baseY - towerH)
        ctx.moveTo(tower2X, deckY)
        ctx.lineTo(tower2X, baseY - towerH)
        ctx.stroke()

        // Main cables (catenary curves)
        ctx.strokeStyle = `rgba(0,255,102,${0.4 * alpha})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(bx, deckY - 5)
        ctx.quadraticCurveTo(
          tower1X,
          baseY - towerH - 10,
          (tower1X + tower2X) / 2,
          deckY + bh * 0.1
        )
        ctx.quadraticCurveTo(tower2X, baseY - towerH - 10, bx + bw, deckY - 5)
        ctx.stroke()

        // Vertical suspender cables
        const cableCount = 12
        ctx.strokeStyle = `rgba(0,255,102,${0.2 * alpha})`
        ctx.lineWidth = 0.5
        for (let ci = 1; ci < cableCount; ci++) {
          const cx = bx + (bw / cableCount) * ci
          // Catenary cable position (visual reference only)

          ctx.beginPath()
          ctx.moveTo(cx, deckY)
          ctx.lineTo(
            cx,
            baseY - towerH + Math.abs(cx - (tower1X + tower2X) / 2) * 0.8
          )
          ctx.stroke()
        }
      } else if (b.style === 'bridge-cable-stayed') {
        // Cable-stayed bridge (Gordie Howe style)
        const deckY = baseY - bh * 0.3
        const towerX = bx + bw * 0.5 // single central tower
        const towerTop = baseY - bh * 0.95

        // Deck
        ctx.strokeStyle = `rgba(16,185,129,${0.5 * alpha})`
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.moveTo(bx, deckY)
        ctx.lineTo(bx + bw, deckY)
        ctx.stroke()

        // Tower (A-frame shape)
        ctx.strokeStyle = `rgba(16,185,129,${0.7 * alpha})`
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(towerX - 3, deckY)
        ctx.lineTo(towerX, towerTop)
        ctx.lineTo(towerX + 3, deckY)
        ctx.stroke()

        // Cables fanning from tower to deck (left side)
        ctx.strokeStyle = `rgba(0,255,102,${0.3 * alpha})`
        ctx.lineWidth = 0.8
        const fanCount = 8
        for (let fi = 1; fi <= fanCount; fi++) {
          const deckX = towerX - ((bw * 0.45) / fanCount) * fi
          const towerAnchorY =
            towerTop + (fi / fanCount) * (deckY - towerTop) * 0.5
          ctx.beginPath()
          ctx.moveTo(towerX, towerAnchorY)
          ctx.lineTo(deckX, deckY)
          ctx.stroke()
        }
        // Cables fanning right side
        for (let fi = 1; fi <= fanCount; fi++) {
          const deckX = towerX + ((bw * 0.45) / fanCount) * fi
          const towerAnchorY =
            towerTop + (fi / fanCount) * (deckY - towerTop) * 0.5
          ctx.beginPath()
          ctx.moveTo(towerX, towerAnchorY)
          ctx.lineTo(deckX, deckY)
          ctx.stroke()
        }
      } else {
        // solid industrial
        ctx.fillStyle = `rgba(15,23,42,${0.8 * alpha})`
        ctx.fillRect(bx, visibleY, bw, bh)
        ctx.strokeStyle = `rgba(245,179,1,${0.35 * alpha})`
        ctx.lineWidth = 1
        ctx.strokeRect(bx, visibleY, bw, bh)
        // Industrial details — horizontal beams
        const beams = Math.floor(bh / 14)
        for (let b2 = 1; b2 < beams; b2++) {
          ctx.beginPath()
          ctx.moveTo(bx, visibleY + b2 * 14)
          ctx.lineTo(bx + bw, visibleY + b2 * 14)
          ctx.strokeStyle = `rgba(245,179,1,${0.12 * alpha})`
          ctx.stroke()
        }
      }
    }

    function drawConveyorLine(alpha) {
      const beltY = H * 0.82 // just above ground line

      // Belt line
      ctx.strokeStyle = `rgba(245,179,1,${0.5 * alpha})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(W * 0.08, beltY)
      ctx.lineTo(W * 0.92, beltY)
      ctx.stroke()

      // Belt rollers (small circles along the belt)
      for (let rx = 0.1; rx < 0.92; rx += 0.04) {
        ctx.beginPath()
        ctx.arc(rx * W, beltY + 2, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,179,1,${0.3 * alpha})`
        ctx.fill()
      }

      // Cars sliding along the belt
      const carCount = 5
      const beltLen = W * 0.84 // belt from 0.08 to 0.92
      const beltStart = W * 0.08
      for (let i = 0; i < carCount; i++) {
        // Each car moves along the belt, wrapping around
        const offset = (t * 20 + i * (beltLen / carCount)) % beltLen
        const cx = beltStart + offset
        const cy = beltY - 10

        // Car body (simple rectangle)
        ctx.fillStyle = `rgba(245,179,1,${0.4 * alpha})`
        ctx.fillRect(cx - 12, cy - 4, 24, 8)
        // Car top (smaller rect)
        ctx.fillStyle = `rgba(245,179,1,${0.3 * alpha})`
        ctx.fillRect(cx - 6, cy - 10, 12, 6)
        // Wheels
        ctx.beginPath()
        ctx.arc(cx - 7, cy + 5, 2.5, 0, Math.PI * 2)
        ctx.arc(cx + 7, cy + 5, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,200,200,${0.5 * alpha})`
        ctx.fill()
      }
    }

    function drawScene(scene, alpha) {
      if (alpha <= 0) return
      const baseY = H * 0.88
      const prlxX = (mx - 0.5) * 25

      for (const b of scene.buildings) {
        drawBuilding(b, baseY, alpha, prlxX)
      }

      if (scene.hasConveyor) {
        drawConveyorLine(alpha)
      }

      // Ground line
      ctx.strokeStyle = `rgba(0,255,102,${0.35 * alpha})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, baseY)
      ctx.lineTo(W, baseY)
      ctx.stroke()

      // Ground glow
      const gg = ctx.createLinearGradient(0, baseY, 0, H)
      gg.addColorStop(0, `rgba(0,255,102,${0.1 * alpha})`)
      gg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gg
      ctx.fillRect(0, baseY, W, H - baseY)
    }

    function drawParticles() {
      const prlxX = (mx - 0.5) * 30
      const prlxY = (my - 0.5) * 15
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H * 0.55
        if (p.y > H * 0.55) p.y = 0
        const dx = p.x + prlxX * p.a
        const dy = p.y + prlxY * p.a
        ctx.beginPath()
        ctx.arc(dx, dy, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.isGold
          ? `rgba(245,179,1,${p.a * 0.6})`
          : `rgba(0,255,102,${p.a * 0.5})`
        ctx.fill()
      }
    }

    function animate() {
      t += 0.016
      ctx.clearRect(0, 0, W, H)
      drawBackground()
      drawMatrixRain()
      drawParticles()

      // Scene crossfade logic
      const totalCycle = SCENES.length * SCENE_DURATION
      const cycleT = t % totalCycle
      const sceneIndex = Math.floor(cycleT / SCENE_DURATION)
      const sceneT = cycleT - sceneIndex * SCENE_DURATION

      // Notify parent when scene changes
      if (sceneIndex !== lastSceneIndex) {
        lastSceneIndex = sceneIndex
        onSceneChange?.(sceneIndex)
      }

      // Current scene alpha
      let currentAlpha = 1
      if (sceneT > SCENE_DURATION - TRANSITION_DURATION) {
        currentAlpha = (SCENE_DURATION - sceneT) / TRANSITION_DURATION
      }

      // Next scene alpha (crossfade in)
      const nextIndex = (sceneIndex + 1) % SCENES.length
      let nextAlpha = 0
      if (sceneT > SCENE_DURATION - TRANSITION_DURATION) {
        nextAlpha = 1 - currentAlpha
      }

      drawScene(SCENES[sceneIndex], currentAlpha)
      if (nextAlpha > 0) {
        drawScene(SCENES[nextIndex], nextAlpha)
      }

      // Bottom fade
      const btm = ctx.createLinearGradient(0, H * 0.88, 0, H)
      btm.addColorStop(0, 'rgba(0,8,4,0)')
      btm.addColorStop(1, 'rgba(5,5,10,1)')
      ctx.fillStyle = btm
      ctx.fillRect(0, H * 0.88, W, H * 0.12)

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [onSceneChange])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 block size-full" />
    </div>
  )
}

TechHeroCanvas.propTypes = {
  onSceneChange: PropTypes.func,
}
