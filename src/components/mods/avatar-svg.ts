/**
 * The agent-panel mod's pixel avatars, copied from the mod itself so the blog
 * animation draws exactly what the real pane draws.
 */
export type Mood = 'running' | 'done' | 'failed' | 'scheduled';

const R = (x: number, y: number, w: number, h: number, fill: string, inner = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}">${inner}</rect>`
const loop = (attr: string, values: string, dur: string, extra = '') =>
  `<animate attributeName="${attr}" values="${values}" dur="${dur}" repeatCount="indefinite" ${extra}/>`
const move = (type: string, values: string, dur: string, extra = '') =>
  `<animateTransform attributeName="transform" type="${type}" values="${values}" dur="${dur}" repeatCount="indefinite" ${extra}/>`

type Persona = {
  motion?: string // on the whole body while running
  shadow?: string // shadow rx while running
  flip?: string // discrete left/right turn while running
  arms?: (live: boolean, B: string) => string
  back?: (live: boolean) => string // drawn behind the body
  front?: (live: boolean) => string // drawn over the body
  hidesEyes?: boolean
  over?: (live: boolean) => string // above the head, never flipped
}

const PERSONAS: Record<string, Persona> = {
  // Blue hard hat and round glasses, holding up a blueprint whose system diagram draws itself while it works.
  architect: {
    arms: (live, B) => R(4, 12, 2, 2, B) + R(20, 11, 2, 2, B, live ? loop('y', '11;10;11', '0.7s') : ''),
    back: () => R(9, 4, 8, 2, '#4A7FD9') + R(7, 6, 12, 3, '#4A7FD9') + R(12.5, 3.6, 1, 5.4, '#2F5FA8') + R(5, 8.4, 16, 1, '#2F5FA8'),
    front: live =>
      `<circle cx="9.5" cy="12" r="1.8" fill="none" stroke="#2B1D17" stroke-width="0.5"/>` +
      `<circle cx="16.5" cy="12" r="1.8" fill="none" stroke="#2B1D17" stroke-width="0.5"/>` +
      R(11.3, 11.7, 3.4, 0.5, '#2B1D17') +
      
      R(22, 8, 7, 9, '#2F5FA8') + R(21.6, 7.4, 7.8, 1, '#4A7FD9') + R(21.6, 16.6, 7.8, 1, '#4A7FD9') +
      `<path d="M24.3 9.2 h2.4 v1.6 h-2.4 Z M25.5 10.8 V12.2 M23.9 12.2 H27.2 M23.9 12.2 V13.6 M27.2 12.2 V13.6 M22.8 13.6 h2.2 v1.6 h-2.2 Z M26.1 13.6 h2.2 v1.6 h-2.2 Z" fill="none" stroke="#EAF3FF" stroke-width="0.5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="0"></path>`,
  },
  // Boy Scout: campaign hat and neckerchief, hops, raises the binoculars to scan, turns, spots something.
  scout: {
    arms: (live, B) =>
      `<g transform="translate(0 ${live ? -3.5 : 0})">${live ? move('translate', '0 -3.5;0 -4.5;0 -3.5', '0.7s') : ''}${R(5, 14, 2, 2, B)}${R(19, 14, 2, 2, B)}</g>`,
    back: () =>
      R(10, 2, 6, 1, '#B08A55') + R(12.5, 2, 1, 1, '#8C6A3E') + R(9, 3, 8, 1, '#B08A55') + R(8, 4, 10, 2.4, '#B08A55') +
      R(8, 5.4, 10, 0.8, '#6B4F3A') + R(3, 6.4, 20, 1.4, '#B08A55') + R(3, 7.8, 20, 0.4, '#8C6A3E'),
    front: live =>
      R(8, 14, 10, 1, '#D9553B') + R(9, 15, 8, 1, '#D9553B') + R(11, 16, 4, 1, '#D9553B') + R(12, 14, 2, 1.2, '#FFD54A') +
      `<g transform="translate(0 ${live ? 0 : 4.5})">${live ? move('translate', '0 0;0 -1;0 0', '0.7s') : ''}` +
      R(7, 10, 4, 3, '#33363B') + R(15, 10, 4, 3, '#33363B') + R(11, 11, 4, 1, '#33363B') +
      R(8, 11, 1, 1, '#8FD3FF') + R(16, 11, 1, 1, '#8FD3FF') + `</g>`,
  },
  // In the zone: headphones on, bobs to the beat, types fast, code floats up off the screen.
  developer: {
    arms: (live, B) =>
      R(7, 18, 2, 1.4, B, live ? loop('y', '18;17;18', '0.24s') : '') +
      R(17, 18, 2, 1.4, B, live ? loop('y', '17;18;17', '0.24s') : ''),
    back: () => R(6, 6, 14, 1, '#33363B') + R(5, 7, 1, 4, '#33363B') + R(20, 7, 1, 4, '#33363B'),
    front: live =>
      R(4, 10, 2, 3, '#E8B931') + R(20, 10, 2, 3, '#E8B931') +
      (live ? R(6, 12, 14, 2, '#9FE8FF', loop('opacity', '0.15;0.35;0.15', '0.5s')) : '') +
      R(8, 14, 10, 5, '#5F6670') + R(12.5, 16, 1, 1, '#9AA0A6') + R(6, 19, 14, 1, '#9AA0A6'),
  },
  // Inspects: sweeps a magnifying glass across the work.
  reviewer: {
    back: () => R(7, 6, 12, 3, '#9AA0A6') + R(13, 8, 8, 1, '#6B7076'),
    front: live =>
      `<g>${live ? move('translate', '0 0;1 0;0 0', '0.7s') : ''}<circle cx="9.5" cy="12" r="2.6" fill="#CFE9FF" fill-opacity="0.45" stroke="#33363B" stroke-width="0.6"/>${R(11.2, 14, 1, 1, '#6B4F3A')}${R(12, 15, 1, 1, '#6B4F3A')}${R(12.8, 16, 1, 1, '#6B4F3A')}</g>`,
  },
  // Carries the box out the door with big hops.
  shipper: {
    arms: (_l, B) => R(5, 6, 2, 4, B) + R(19, 6, 2, 4, B),
    back: live => `<g>${live ? move('translate', '0 0;0 -1;0 0', '0.6s') : ''}${R(7, 0, 12, 6, '#C68B4E')}${R(12.5, 0, 1, 6, '#E9D3A6')}</g>`,
  },
  explore: {
    flip: move('scale', '1 1;-1 1', '4s', 'calcMode="discrete" keyTimes="0;0.5"'),
    back: () => R(11, 2, 4, 2, '#9B6BD9') + R(9, 4, 8, 2, '#9B6BD9') + R(7, 6, 12, 3, '#9B6BD9') + R(12, 4, 1, 1, '#FFD54A'),
  },
    agent: {},
  // The main chat: a captain's cap, white top, navy band, gold badge, brim over the brow.
  main: {
    back: () =>
      R(7, 2, 12, 1, '#C9CED6') + R(5, 3, 16, 1, '#C9CED6') + R(6, 3, 14, 1, '#FFFFFF') + R(5, 4, 16, 2, '#FFFFFF') +
      R(5, 6, 16, 1, '#C9CED6') + R(7, 7, 12, 2, '#1F2A44') + R(12, 6, 2, 2, '#E8B931'),
        front: () => R(7, 9, 12, 1, '#111827') + R(8, 10, 10, 1, '#111827'),
  },
}
PERSONAS['tech lead'] = PERSONAS.reviewer!

const avatarCache = new Map<string, string>()
export function avatarSvg(role: string, mood: Mood): string {
  const id = `${role}|${mood}`
  const hit = avatarCache.get(id)
  if (hit) return hit
  const p = PERSONAS[role] ?? PERSONAS.agent!
  const live = mood === 'running'
  const B = mood === 'failed' ? '#C0392B' : '#D97757'
  const E = '#2B1D17'
  const blink = (x: number) =>
    R(x, 11, 1, 2, E, live ? loop('height', '2;2;0.3;2', '0.9s', 'keyTimes="0;0.8;0.9;1"') + loop('y', '11;11;12.2;11', '0.9s', 'keyTimes="0;0.8;0.9;1"') : '')
  const eyes =
    mood === 'done' && (role === 'architect' || role === 'main')
      ? blink(9) + blink(16)
      : mood === 'done'
      ? R(8, 12, 1, 1, E) + R(9, 11, 1, 1, E) + R(10, 12, 1, 1, E) + R(15, 12, 1, 1, E) + R(16, 11, 1, 1, E) + R(17, 12, 1, 1, E)
      : mood === 'failed'
        ? R(8, 10, 1, 1, E) + R(10, 10, 1, 1, E) + R(9, 11, 1, 1, E) + R(8, 12, 1, 1, E) + R(10, 12, 1, 1, E) +
          R(15, 10, 1, 1, E) + R(17, 10, 1, 1, E) + R(16, 11, 1, 1, E) + R(15, 12, 1, 1, E) + R(17, 12, 1, 1, E)
        : mood === 'scheduled'
          ? R(8, 12, 3, 0.6, E) + R(15, 12, 3, 0.6, E)
          : p.hidesEyes ? '' : blink(9) + blink(16)
  const legs = [7, 10, 15, 18].map(x => R(x, 17, 1, 3, B)).join('')
  const figure =
    (p.back?.(live) ?? '') +
    legs +
    R(6, 9, 14, 8, B) +
    (p.arms ? p.arms(live, B) : R(4, 12, 2, 2, B) + R(20, 12, 2, 2, B)) +
    eyes +
    (p.front?.(live) ?? '')
  const turned = live && p.flip ? `<g transform="translate(13 0)"><g>${p.flip}<g transform="translate(-13 0)">${figure}</g></g></g>` : figure
  const zzz =
    mood === 'scheduled'
      ? `<text x="20" y="5" font-size="4" font-family="monospace" font-weight="bold" fill="#9AA0A6">z</text><text x="23" y="2" font-size="3" font-family="monospace" font-weight="bold" fill="#9AA0A6">z</text>`
      : ''
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 33 27" shape-rendering="crispEdges">` +
    `<ellipse cx="13" cy="21.6" rx="7" ry="0.9" fill="#000" fill-opacity="0.18">${live && p.shadow ? p.shadow : ''}</ellipse>` +
    `<g${mood === 'scheduled' ? ' opacity="0.55"' : ''}>${live && p.motion ? p.motion : ''}${turned}</g>` +
    (p.over?.(live) ?? '') +
    zzz +
    `</svg>`
  avatarCache.set(id, svg)
  return svg
}

// Working indicator: three dots dimming in turn. The rest state is full brightness, since every pane redraw restarts the animation.
const dotsCache = new Map<string, string>()
export function dotsSvg(color: string): string {
  const hit = dotsCache.get(color)
  if (hit) return hit
  const dot = (cx: number, begin: string) =>
    `<circle cx="${cx}" cy="5" r="1.6" fill="${color}">` +
    `<animate attributeName="opacity" values="1;0.45;1;1" keyTimes="0;0.25;0.5;1" dur="0.8s" begin="${begin}" repeatCount="indefinite"/>` +
    `</circle>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8">${dot(3, '0s')}${dot(8, '0.13s')}${dot(13, '0.26s')}</svg>`
  dotsCache.set(color, svg)
  return svg
}
